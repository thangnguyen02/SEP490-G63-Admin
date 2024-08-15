import { Dialog, Menu, Transition } from '@headlessui/react'
import { Fragment, useMemo, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  EyeIcon,
  NoSymbolIcon,
  ArrowPathIcon,
  ArrowUpOnSquareIcon,
  EllipsisVerticalIcon,
  LockOpenIcon,
  PaperAirplaneIcon,
  UserIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'
import { statusRule } from '~/common/const/status'
import {
  approveCustomer,
  approveExtend,
  banCustomer,
  extendService,
  getAllQueueExtend,
  getCustomer,
  rejectExtend,
  uploadFileCompany
} from '~/services/customer.service'
import useToast from '~/hooks/useToast'
import Expried from '~/components/Admin/Employee/Expried'
import moment from 'moment'
import { AxiosError } from 'axios'
import { useMutation, useQuery } from 'react-query'
import Pagination from '~/components/BaseComponent/Pagination/Pagination'
import Loading from '~/components/shared/Loading/Loading'
import { Controller, useForm } from 'react-hook-form'
import LoadingIcon from '~/assets/LoadingIcon'

const statusList = [
  {
    value: 'PROCESSING',
    title: 'Chờ xác nhận',
    color: 'text-black-700'
  },
  {
    value: 'APPROVED',
    title: 'Đã xác nhận',
    color: 'text-green-700'
  },
  { value: 'REJECTED', title: 'Đã từ chối', color: 'text-red-700' }
]
const statusListRender = {
  ['PROCESSING']: {
    title: 'Chờ xác nhận',
    color: 'text-black-700'
  },
  ['APPROVED']: {
    title: 'Đã xác nhận',
    color: 'text-green-700'
  },
  ['REJECTED']: {
    title: 'Đã từ chối',
    color: 'text-red-700'
  }
}

type FormType = {
  status: string
  fromDate: Date
  toDate: Date
  companyName: string
}

const QueueCompany = () => {
  const [banModal, setBanModal] = useState(false)
  const [approveModal, setApproveModal] = useState(false)
  const inputPdfRef = useRef<any>(null)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [totalPage, setTotalPage] = useState(1)
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null)
  const { successNotification, errorNotification } = useToast()
  const { register, handleSubmit, getValues, control } = useForm<FormType>()
  function closeModal() {
    setBanModal(false)
    setApproveModal(false)
    setSelectedCustomer(null)
  }
  const { data, isLoading, refetch, isFetching } = useQuery(
    'queue-list',
    () =>
      getAllQueueExtend({
        status: getValues('status'),
        companyName: getValues('companyName'),
        page,
        size,
        fromDate: `${getValues('fromDate') ? moment(getValues('fromDate')).format('YYYY-MM-DD') : ''}`,
        toDate: `${getValues('toDate') ? moment(getValues('toDate')).format('YYYY-MM-DD') : ''}`
      }),
    {
      onSuccess: (result: any) => {
        setTotalPage(result?.object?.totalPages)
      },
      onError: (error: AxiosError<{ message: string }>) => {
        errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
      }
    }
  )
  const uploadQuery = useMutation(uploadFileCompany, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    },
    onSuccess: (result: any) => {
      successNotification('Tải tệp thành công')
      setSelectedCustomer(null)
    }
  })
  const handUploadPdf = (event: any) => {
    const files = event.target.files[0]
    if (files?.type != 'application/pdf') {
      errorNotification('Tệp không hợp lệ, vui lòng chọn tệp PDF.')
    } else {
      const formData = new FormData()
      formData.append('id', selectedCustomer?.id as string)
      formData.append('file', files)
      uploadQuery.mutate(formData)
    }
  }
  const handlePageChange = (page: any) => {
    setPage(page - 1)
  }
  const approveExtendQuery = useMutation(approveExtend, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    },
    onSuccess: (response) => {
      if (response?.object?.code == '00') {
        successNotification('Gia hạn dịch vụ thành công')
        closeModal()
        refetch()
      } else {
        errorNotification('Không thể gia hạn');
      }
    }
  })
  const rejectExtendQuery = useMutation(rejectExtend, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    },
    onSuccess: () => {
      successNotification('Từ chối gia hạn thành công')
      closeModal()
      refetch()
    }
  })
  const handleApproveCompany = async () => {
    approveExtendQuery.mutate({
      companyId: selectedCustomer?.companyId,
      pricePlanId: selectedCustomer?.pricePlanId
    })
  }
  const handleRejectCompany = async () => {
    rejectExtendQuery.mutate(selectedCustomer?.id as string)
  }
  const onSubmit = async (data: any) => {
    refetch()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <input type='file' ref={inputPdfRef} accept='.pdf' onChange={handUploadPdf} className='hidden' />
        <div className='flex gap-3 justify-start w-full items-start flex-wrap'>
          <div className='relative w-full md:w-[30%] '>
            <div className='absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            <input
              type='text'
              id='table-search'
              {...register('companyName')}
              className='block p-2 ps-10 w-full text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Tên công ty'
            />
          </div>
          <div className='w-full md:w-[20%] h-full '>
            <select
              {...register('status')}
              className='w-full text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
              <option value=''>Tất cả</option>
              {statusList?.map((s: any) => (
                <option value={s.value} key={s.value}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
          <div className='w-full md:w-[20%] h-full '>
            <Controller
              name='fromDate'
              control={control}
              render={({ field }) => (
                <DatePicker
                  placeholderText='Ngày bắt đầu'
                  className='w-full text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />
          </div>

          <div className='w-full md:w-[20%] h-full '>
            <Controller
              name='toDate'
              control={control}
              render={({ field }) => (
                <DatePicker
                  placeholderText='Ngày kết thúc'
                  className='w-full text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />
          </div>
          <button
            type='submit'
            className='rounded-md flex gap-1 bg-main-color px-4 py-2 text-sm font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
          >
            Tìm
          </button>
        </div>
      </form>
      <div className='overflow-auto mt-3'>
        <div className='shadow-md sm:rounded-lg h-fit'>
          <table className='w-full text-sm text-left shadow-md sm:rounded-lg rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto z-0'>
            <thead className=' text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-2 py-3 text-center'>
                  STT
                </th>
                <th scope='col' className='px-2 py-3'>
                  Tên khách hàng
                </th>
                <th scope='col' className='px-2 py-3 text-center'>
                  Mã số thuế
                </th>
                <th scope='col' className='px-2 py-3 text-center'>
                  Ngày đăng ký
                </th>
                <th scope='col' className='px-2 py-3'>
                  Tên gói
                </th>
                <th scope='col' className='px-2 py-3 text-center'>
                  Trạng thái
                </th>
                <th scope='col' className='px-2 py-3 text-center'>
                  Số tiền
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {!isLoading &&
                !isFetching &&
                data?.object?.content?.map((d: any, index: number) => (
                  <tr
                    key={d.id}
                    className=' w-full bg-white border-b text-black hover:bg-gray-50 dark:hover:bg-gray-600'
                  >
                    <td className='px-2 py-2 text-center'>{index + 1}</td>
                    <td className='px-2 py-2'>{d?.companyName}</td>
                    <td className='px-2 py-2 text-center'>{d?.taxCode}</td>
                    <td className='px-2 py-2 text-center'>
                      {d?.createdDate ? moment(d?.createdDate).format('DD-MM-YYYY') : d?.createdDate}
                    </td>
                    <td className='px-2 py-2'>{d?.pricePlanName}</td>

                    <td className={`px-2 py-2 text-center ${statusListRender[d?.status]?.color}`}>
                      {statusListRender[d?.status]?.title}
                    </td>
                    <td className='px-2 py-2 text-center'>
                      {d?.price == null ? 0 : (d?.price + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </td>
                    <td className='px-2 py-2 text-center'>
                      <Menu as='div' className='relative inline-block text-left '>
                        {d?.status == 'PROCESSING' ? (
                          <Menu.Button className='flex justify-center items-center gap-3 cursor-pointer hover:text-blue-500'>
                            <EllipsisVerticalIcon className='h-7 w-7' title='Hành động' />
                          </Menu.Button>
                        ) : (
                          <></>
                        )}

                        <Transition
                          as={Fragment}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <Menu.Items className='absolute right-8 top-[-130%] z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  title='Xác nhận'
                                  onClick={() => {
                                    setSelectedCustomer(d)
                                    setApproveModal(true)
                                  }}
                                  className={`${
                                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                  } group flex w-full items-center  gap-3 rounded-md px-2 py-2 text-sm `}
                                >
                                  <LockOpenIcon className='h-5' /> Xác nhận
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  title='Hủy'
                                  onClick={() => {
                                    setSelectedCustomer(d)
                                    setBanModal(true)
                                  }}
                                  className={`${
                                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                  } group flex w-full items-center  gap-3 rounded-md px-2 py-2 text-sm `}
                                >
                                  <ExclamationCircleIcon className='h-5' /> Từ chối
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {(isLoading || isFetching) && (
            <Loading loading={isLoading || isFetching}>
              <div className='w-full min-h-[60vh] opacity-75 bg-gray-50 flex items-center justify-center'></div>
            </Loading>
          )}
          {!isLoading && !isFetching && (data?.object == null || data?.object?.content?.length == 0) && (
            <div className='w-full min-h-[60vh] opacity-75 bg-gray-50 flex items-center justify-center'>
              <div className='flex flex-col justify-center items-center opacity-60'>
                <UserIcon />
                Chưa có Công ty
              </div>
            </div>
          )}
        </div>
        {!isLoading && !isFetching && data?.object && data?.object?.content?.length != 0 && (
          <Pagination
            totalPages={totalPage}
            currentPage={page + 1}
            size={size}
            setSize={setSize}
            setPage={setPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <Transition appear show={banModal} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full  items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-[100vw] md:w-[40vw]  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Hủy dịch vụ
                  </Dialog.Title>
                  <div>
                    <div>
                      Gói dịch vụ sẽ được hủy với công ty {selectedCustomer?.companyName}. Bạn có chắc chắn với quyết
                      định của mình?
                    </div>
                    <div className='w-full flex justify-end mt-6'>
                      <button
                        type='button'
                        disabled={rejectExtendQuery?.isLoading}
                        className='middle  none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        data-ripple-light='true'
                        onClick={() => handleRejectCompany()}
                      >
                        {rejectExtendQuery?.isLoading ? <LoadingIcon /> : 'Chấp nhận'}
                      </button>
                      <button
                        type='button'
                        className='middle  none center mr-4 rounded-lg bg-[#49484d] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#49484d]  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        data-ripple-light='true'
                        onClick={closeModal}
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={approveModal} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full  items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-[100vw] md:w-[40vw]  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Kích hoạt dịch vụ
                  </Dialog.Title>
                  <div>
                    <div>
                      Gói dịch vụ sẽ được kích hoạt với công ty {selectedCustomer?.companyName}. Bạn có chắc chắn với
                      quyết định của mình?
                    </div>
                    <div className='w-full flex justify-end mt-6'>
                      <button
                        type='button'
                        className='middle  none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        data-ripple-light='true'
                        onClick={() => handleApproveCompany()}
                      >
                        Chấp nhận
                      </button>
                      <button
                        type='button'
                        className='middle  none center mr-4 rounded-lg bg-[#49484d] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#49484d]  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        data-ripple-light='true'
                        onClick={closeModal}
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default QueueCompany
