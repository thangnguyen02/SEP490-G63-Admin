import { Dialog, Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useMemo, useState } from 'react'
import AddNewUser from '~/components/Admin/Employee/AddNewUser'
import DatePicker from 'react-datepicker'
import ViewCustomer from '~/components/Admin/Employee/ViewCustomer'
import {
  EyeIcon,
  NoSymbolIcon,
  ArrowPathIcon,
  ArrowUpOnSquareIcon,
  EllipsisVerticalIcon,
  LockOpenIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'
import { dataCustomer } from '~/common/dataConfig'
import { statusRule } from '~/common/const/status'
import { approveCustomer, banCustomer, getCustomer } from '~/services/customer.service'
import useToast from '~/hooks/useToast'
import Expried from '~/components/Admin/Employee/Expried'
import moment from 'moment'
import Loading from '~/components/shared/Loading/Loading'
export type DataCustomer = {
  id: string
  companyName: string
  startDateUseService: string
  endDateUseService: string
  registerDate: string
  taxCode: string
  status: 'PROCESSING' | 'LOCKED' | 'EXPIRED' | 'INUSE'
  price: number
}
const User = () => {
  const [banModal, setBanModal] = useState(false)
  const [extendModal, setExtendModal] = useState(false)
  const [approveModal, setApproveModal] = useState(false)
  const [startDate, setStartDate] = useState<Date | null>()
  const [endDate, setEndDate] = useState<Date | null>()
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [status, setStatus] = useState('')
  const [data, setData] = useState<DataCustomer[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<DataCustomer | null>(null)
  const { successNotification, errorNotification } = useToast()
  function closeModal() {
    setBanModal(false)
    setExtendModal(false)
    setApproveModal(false)
    setSelectedCustomer(null)
  }
  const totalMoney = useMemo(() => {
    return data.reduce((total: number, d: DataCustomer) => {
      total += d.price
      return total
    }, 0)
  }, [data])
  const handleBanCompany = async () => {
    if (selectedCustomer?.id) {
      const response = await banCustomer(selectedCustomer?.id)
      if (response) {
        successNotification('Hủy dịch vụ thành công')
        closeModal()
      }
    }
  }
  const handleApproveCompany = async () => {
    if (selectedCustomer?.id) {
      const response = await approveCustomer(selectedCustomer?.id)
      if (response) {
        successNotification('Kích hoạt dịch vụ thành công')
        closeModal()
      }
    }
  }
  useEffect(() => {
    const fetchAPI = async () => {
      const data = await getCustomer({ status, page, size })
      if (data) {
        setData(data.content)
      }
    }
    fetchAPI()
  }, [page, size, status, selectedCustomer])
  const handleOnSubmit = (e: any) => {
    e.preventDefault()
  }
  if (!data) return <Loading />
  return (
    <div className='bg-[#e8eaed] h-full'>
      <div className='flex flex-wrap py-4'>
        <div className=' w-full px-5  md:w-[100%]'>
          <form onSubmit={handleOnSubmit} className='mt-4'>
            <div className='flex gap-3 justify-around w-full items-start flex-wrap md:flex-nowrap'>
              <div className='relative w-full '>
                <div className='absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none'>
                  <svg
                    className='w-5 h-5 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                </div>
                <input
                  type='text'
                  id='table-search'
                  className='block p-2 ps-10 w-full text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Tìm kiếm tên công ty'
                />
              </div>
              <div className='w-[40%] h-full '>
                <DatePicker
                  className='text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  selected={startDate}
                  placeholderText='Ngày bắt đầu'
                  onChange={(date) => setStartDate(date)}
                />
              </div>

              <div className='w-[40%] h-full'>
                <DatePicker
                  className='text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  selected={endDate}
                  minDate={startDate}
                  placeholderText='Ngày kết thúc'
                  onChange={(date) => setEndDate(date)}
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
          <div className='overflow-x-auto  my-3 z-0 h-[70vh]'>
            <table className='w-full text-sm text-left shadow-md sm:rounded-lg rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto z-0'>
              <thead className=' text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-2 py-3 text-center'>
                    STT
                  </th>
                  <th scope='col' className='px-2 py-3 text-center'>
                    Tên khách hàng
                  </th>
                  <th scope='col' className='px-2 py-3 text-center'>
                    Ngày bắt đầu
                  </th>
                  <th scope='col' className='px-2 py-3 text-center'>
                    Ngày kết thúc
                  </th>
                  <th scope='col' className='px-2 py-3 text-center'>
                    Ngày đăng ký
                  </th>
                  <th scope='col' className='px-2 py-3 text-center'>
                    Mã số thuế
                  </th>
                  <th scope='col' className='px-2 py-3 text-center'>
                    Trạng thái
                  </th>
                  <th scope='col' className='px-2 py-3 text-center'>
                    Thành tiền(VND)
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='w-full'>
                {data?.map((d: DataCustomer, index: number) => (
                  <tr className=' w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                    <td className='px-2 py-2 text-center'>{index + 1}</td>
                    <td className='px-2 py-2 text-center'>{d?.companyName}</td>
                    <td className='px-2 py-2 text-center'>
                      {d?.startDateUseService
                        ? moment(d?.startDateUseService).format('DD-MM-YYYY')
                        : d?.startDateUseService}
                    </td>
                    <td className='px-2 py-2 text-center'>
                      {d?.endDateUseService ? moment(d?.endDateUseService).format('DD-MM-YYYY') : d?.endDateUseService}
                    </td>
                    <td className='px-2 py-2 text-center'>
                      {d?.registerDate ? moment(d?.registerDate).format('DD-MM-YYYY') : d?.registerDate}
                    </td>
                    <td className='px-2 py-2 text-center'>{d?.taxCode}</td>
                    <td className={`px-2 py-2 text-center ${statusRule[d?.status]?.color}`}>
                      {statusRule[d?.status]?.title}
                    </td>
                    <td className='px-2 py-2 text-center'>
                      {d?.price == null ? 0 : (d?.price + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </td>
                    <td className='px-2 py-2 text-center'>
                      <Menu as='div' className='relative inline-block text-left '>
                        <Menu.Button>
                          <button className='flex justify-center items-center gap-3 cursor-pointer hover:text-blue-500'>
                            <EllipsisVerticalIcon className='h-7 w-7' title='Hành động' />
                          </button>
                        </Menu.Button>

                        <Transition
                          as={Fragment}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <Menu.Items className='absolute right-8 top-[-100%] z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
                            {d?.status == 'PROCESSING' ? (
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    title='Xác nhận'
                                    onClick={() => {
                                      setSelectedCustomer(d)
                                      setApproveModal(true)
                                    }}
                                    className={`${
                                      active ? 'bg-green-500 text-white' : 'text-gray-900'
                                    } group flex w-full items-center  gap-3 rounded-md px-2 py-2 text-sm `}
                                  >
                                    <LockOpenIcon className='h-5' /> Kích hoạt
                                  </button>
                                )}
                              </Menu.Item>
                            ) : (
                              <>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      title='Xem'
                                      className={`${
                                        active ? 'bg-green-500 text-white' : 'text-gray-900'
                                      } group flex w-full items-center  gap-3 rounded-md px-2 py-2 text-sm `}
                                    >
                                      <EyeIcon className='h-5' /> Xem
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      title='Gia hạn'
                                      className={`${
                                        active ? 'bg-green-500 text-white' : 'text-gray-900'
                                      } group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm `}
                                    >
                                      <PaperAirplaneIcon className='h-5' /> Gửi mail
                                    </button>
                                  )}
                                </Menu.Item>
                                {d?.status != 'LOCKED' && d?.status != 'EXPIRED' && (
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        title='Chặn'
                                        onClick={() => {
                                          setSelectedCustomer(d)
                                          setBanModal(true)
                                        }}
                                        className={`${
                                          active ? 'bg-green-500 text-white' : 'text-gray-900'
                                        } group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm `}
                                      >
                                        <NoSymbolIcon className='h-5' /> Hủy
                                      </button>
                                    )}
                                  </Menu.Item>
                                )}

                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      title='Gia hạn'
                                      onClick={() => {
                                        setSelectedCustomer(d)
                                        setExtendModal(true)
                                      }}
                                      className={`${
                                        active ? 'bg-green-500 text-white' : 'text-gray-900'
                                      } group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm `}
                                    >
                                      <ArrowPathIcon className='h-5' /> Gia hạn
                                    </button>
                                  )}
                                </Menu.Item>

                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      title='Tải file'
                                      className={`${
                                        active ? 'bg-green-500 text-white' : 'text-gray-900'
                                      } group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm `}
                                    >
                                      <ArrowUpOnSquareIcon className='h-5' /> Tải file
                                    </button>
                                  )}
                                </Menu.Item>
                              </>
                            )}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>
                ))}

                <tr className=' w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                  <td className='px-2 py-4'></td>
                  <td className='px-2 py-4'></td>
                  <td className='px-2 py-4'></td>
                  <td className='px-2 py-4'></td>
                  <td className='px-2 py-4'></td>
                  <td className='px-2 py-4'></td>
                  <td className='px-2 py-4'></td>
                  <td className='px-2 py-6 text-center text-black'>
                    Tổng: {(totalMoney + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                  <td className='px-2 py-4 '></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Transition appear show={banModal} as={Fragment}>
        <Dialog as='div' className='relative z-10 w-[90vw]' onClose={closeModal}>
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
                        className='middle  none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        data-ripple-light='true'
                        onClick={() => handleBanCompany()}
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
      <Transition appear show={extendModal} as={Fragment}>
        <Dialog as='div' className='relative z-10 w-[90vw]' onClose={closeModal}>
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
                  <Expried closeModal={closeModal} selectedCustomer={selectedCustomer} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={approveModal} as={Fragment}>
        <Dialog as='div' className='relative z-10 w-[90vw]' onClose={closeModal}>
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
    </div>
  )
}
export default User
