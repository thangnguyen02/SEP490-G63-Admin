import { Dialog, Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Cog6ToothIcon, NoSymbolIcon, EllipsisVerticalIcon, PlusIcon, UserIcon } from '@heroicons/react/24/outline'
import { createPrice, deletePrice, getPrice, updatePrice } from '~/services/price.service'
import useToast from '~/hooks/useToast'
import { SubmitHandler, useForm } from 'react-hook-form'
import UpdatePrice from '~/components/Admin/Price/UpdatePrice'
import Pagination from '~/components/BaseComponent/Pagination/Pagination'
import { useMutation, useQuery } from 'react-query'
import Loading from '~/components/shared/Loading/Loading'
import { AxiosError } from 'axios'
import LoadingIcon from '~/assets/LoadingIcon'
export type DataPrice = {
  id?: string
  name: string
  description: string | null
  price: number
  timeWithYears: number
  discount: number
}
const Price = () => {
  const [selectedPrice, setSelectedPrice] = useState<DataPrice | null>(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const { errorNotification, successNotification } = useToast()
  const prevPageRef = useRef(page)
  const prevSizeRef = useRef(size)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<DataPrice>()
  function closeModalDelete() {
    setDeleteModal(false)
    setSelectedPrice(null)
  }
  function closeModalUpdate() {
    setUpdateModal(false)
    setSelectedPrice(null)
  }
  const deleteQuery = useMutation(deletePrice, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    },
    onSuccess: () => {
      successNotification('Xóa thành công')
      closeModalDelete()
      refetch()
    }
  })
  const handleDelete = async () => {
    if (selectedPrice?.id) {
      deleteQuery.mutate(selectedPrice?.id)
    }
  }
  const handlePageChange = (page: any) => {
    setPage(page - 1)
  }
  const createQuery = useMutation(createPrice, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    },
    onSuccess: () => {
      successNotification('Tạo gói dịch vụ thành công')
      setAddModal(false)
      refetch()
      reset()
    }
  })
  const onSubmit: SubmitHandler<DataPrice> = async (data) => {
    createQuery.mutate(data)
  }
  const { data, isLoading, refetch, isFetching } = useQuery('get-price', getPrice, {
    onSuccess: (res) => {},
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    }
  })

  useEffect(() => {
    if (prevPageRef.current !== page || prevSizeRef.current !== size) {
      prevPageRef.current = page
      prevSizeRef.current = size
      refetch()
    }
  }, [page, refetch, size])

  return (
    <div className='bg-[#e8eaed] h-full'>
      <div className='flex flex-wrap py-4'>
        <div className=' w-full px-5  md:w-[100%]'>
          <div className='flex my-3 justify-end items-center'>
            <button
              type='button'
              onClick={() => setAddModal(true)}
              className='rounded-md flex gap-1 bg-main-color px-4 py-2 text-sm font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
            >
              <PlusIcon className='h-5 w-5' /> Thêm
            </button>
          </div>
          <div className='shadow-md sm:rounded-lg my-3  max-h-[73vh] '>
            <table className='w-full text-sm text-left rtl:text-right text-black dark:text-gray-400 '>
              <thead className=' text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
                <tr>
                  <th scope='col' className='px-2 py-3 text-center'>
                    STT
                  </th>
                  <th scope='col' className='px-2 py-3 w-[100px]'>
                    Tên
                  </th>
                  <th scope='col' className='px-2 py-3 text-center'>
                    Thời gian(năm)
                  </th>
                  <th scope='col' className='px-2 py-3 text-center'>
                    Chiết khấu(%)
                  </th>
                  <th scope='col' className='px-2 py-3 w-[300px]'>
                    Mô tả
                  </th>
                  <th scope='col' className='px-2 py-3 text-center'>
                    Giá tiền(VND)
                  </th>
                  <th className='px-3 py-3 w-[30px]'></th>
                </tr>
              </thead>

              <tbody className='w-full '>
                {!isLoading &&
                  !isFetching &&
                  data?.map((d: DataPrice, index: number) => (
                    <tr className=' w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                      <td className='px-2 py-4 text-center'>{size * page + index + 1} </td>
                      <td className='px-2 py-4'>
                        <div className='w-[100px] truncate ...'>{d?.name}</div>
                      </td>
                      <td className='px-2 py-4 text-center'>{d?.timeWithYears}</td>
                      <td className='px-2 py-4 text-center'>{d?.discount}</td>
                      <td className='px-2 py-4 '>
                        <div className='w-[300px] truncate ...'>{d?.description}</div>
                      </td>
                      <td className='px-2 py-4 text-center'>{(d?.price + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                      <td className='px-2 py-4 text-center'>
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
                            <Menu.Items className='absolute right-8 top-[-100%] z-50 mt-2 w-24 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    title='Sửa'
                                    onClick={() => {
                                      setUpdateModal(true)
                                      setSelectedPrice(d)
                                    }}
                                    className={`${
                                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                    } group flex w-full items-center  gap-3 rounded-md px-2 py-2 text-sm `}
                                  >
                                    <Cog6ToothIcon className='h-5' /> Sửa
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    title='Xóa'
                                    onClick={() => {
                                      setDeleteModal(true)
                                      setSelectedPrice(d)
                                    }}
                                    className={`${
                                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                    } group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm `}
                                  >
                                    <NoSymbolIcon className='h-5' /> Xóa
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
                <div className='w-full min-h-[200px] opacity-75 bg-gray-50 flex items-center justify-center'></div>
              </Loading>
            )}
            {!isLoading && !isFetching && (data == null || data?.length == 0) && (
              <div className='w-full min-h-[200px] opacity-75 bg-gray-50 flex items-center justify-center'>
                <div className='flex flex-col justify-center items-center opacity-60'>
                  <UserIcon width={50} height={50} />
                  Chưa có gói dịch vụ
                </div>
              </div>
            )}
          </div>
          {!isLoading && !isFetching && data && data?.length != 0 && (
            <Pagination
              totalPages={totalPage}
              currentPage={page + 1}
              size={size}
              setSize={setSize}
              setPage={setPage}
              onPageChange={handlePageChange}
            />
          )}

          <Transition appear show={deleteModal} as={Fragment}>
            <Dialog as='div' className='relative z-50 w-[90vw]' onClose={closeModalDelete}>
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
                    <Dialog.Panel className='w-[100vw] md:w-[40vw] md:h-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                      <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                        Thông báo
                      </Dialog.Title>
                      <div>
                        <div>Gói dịch vụ sẽ được xóa vĩnh viễn. Bạn có chắc chắn với quyết định của mình?</div>
                        <div className='w-full flex justify-end mt-6'>
                          <button
                            type='button'
                            className='middle  none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                            data-ripple-light='true'
                            onClick={() => handleDelete()}
                          >
                            {deleteQuery.isLoading ? <LoadingIcon /> : 'Xóa'}
                          </button>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>

          <Transition appear show={addModal} as={Fragment}>
            <Dialog as='div' className='relative z-50 w-[90vw]' onClose={() => setAddModal(false)}>
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
                    <Dialog.Panel className='w-[100vw] md:w-[40vw] md:h-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                      <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                        Thêm mới gói dịch vụ
                      </Dialog.Title>

                      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-wrap justify-between'>
                        <div className='w-full md:w-[48%] mt-5 relative'>
                          <label className='font-bold '>
                            Tên dịch vụ<sup className='text-red-500'>*</sup>
                          </label>
                          <input
                            className={`${errors.name ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                            placeholder='Nhập tên dịch vụ'
                            {...register('name', {
                              required: 'Tên không được để trống'
                            })}
                          />
                          <div
                            className={`text-red-500 absolute text-[12px]  ${errors.name ? 'visible' : 'invisible'}`}
                          >
                            {errors.name?.message}
                          </div>
                        </div>
                        <div className='w-full md:w-[48%] mt-5 relative'>
                          <label className='font-bold '>
                            Thời gian sử dụng(năm)<sup className='text-red-500'>*</sup>
                          </label>
                          <input
                            type='number'
                            min={1}
                            className={`${errors.timeWithYears ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                            placeholder='Nhập thời gian sử dụng dịch vụ'
                            {...register('timeWithYears', {
                              required: 'Thời gian sử dụng được để trống'
                            })}
                          />
                          <div
                            className={`text-red-500 absolute text-[12px]  ${errors.timeWithYears ? 'visible' : 'invisible'}`}
                          >
                            {errors.timeWithYears?.message}
                          </div>
                        </div>
                        <div className='w-full md:w-[48%]  mt-5 relative'>
                          <label className='font-bold '>
                            Giá(VND)<sup className='text-red-500'>*</sup>
                          </label>
                          <input
                            className={`${errors.price ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                            type='number'
                            min={0}
                            placeholder='Nhập giá dịch vụ'
                            {...register('price', {
                              required: 'Giá không được để trống'
                            })}
                          />
                          <div
                            className={`text-red-500 absolute text-[12px] ${errors.price ? 'visible' : 'invisible'}`}
                          >
                            {errors.price?.message}
                          </div>
                        </div>
                        <div className='w-full md:w-[48%]  mt-5 relative'>
                          <label className='font-bold '>
                            Chiết khấu(%)<sup className='text-red-500'>*</sup>
                          </label>
                          <input
                            className={`${errors.discount ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                            type='number'
                            placeholder='Nhập chiết khấu dịch vụ'
                            {...register('discount', {
                              required: 'Chiết khấu không được để trống'
                            })}
                          />
                          <div
                            className={`text-red-500 absolute text-[12px] ${errors.discount ? 'visible' : 'invisible'}`}
                          >
                            {errors.discount?.message}
                          </div>
                        </div>
                        <div className='w-full   mt-5 relative'>
                          <label className='font-bold '>
                            Mô tả<sup className='text-red-500'>*</sup>
                          </label>
                          <textarea
                            className={`${errors.description ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                            rows={4}
                            placeholder='Nhập mô tả dịch vụ'
                            {...register('description')}
                          />
                          <div
                            className={`text-red-500 absolute text-[12px] ${errors.description ? 'visible' : 'invisible'}`}
                          >
                            {errors.description?.message}
                          </div>
                        </div>
                        <div className='w-full flex justify-end mt-6'>
                          <button
                            type='submit'
                            className='middle  none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                            data-ripple-light='true'
                          >
                            {createQuery.isLoading ? <LoadingIcon /> : 'Thêm'}
                          </button>
                          <button
                            type='button'
                            className='middle  none center mr-4 rounded-lg bg-[#49484d] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#49484d]  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                            data-ripple-light='true'
                            onClick={() => setAddModal(false)}
                          >
                            Hủy
                          </button>
                        </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>

          <Transition appear show={updateModal} as={Fragment}>
            <Dialog as='div' className='relative z-50 w-[90vw]' onClose={closeModalUpdate}>
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
                    <Dialog.Panel className='w-[100vw] md:w-[40vw] md:h-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                      <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                        Sửa gói dịch vụ
                      </Dialog.Title>
                      <UpdatePrice
                        selectedPrice={selectedPrice}
                        closeModalUpdate={closeModalUpdate}
                        refetch={refetch}
                      />
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  )
}
export default Price
