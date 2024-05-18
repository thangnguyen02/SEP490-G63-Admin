import { SubmitHandler, useForm } from 'react-hook-form'
import useToast from '~/hooks/useToast'
import { DataPrice } from '~/pages/Admin/Price'
import { updatePrice } from '~/services/price.service'
interface Iprops {
  closeModalUpdate: () => void
  selectedPrice: DataPrice | null
}
const UpdatePrice = ({ closeModalUpdate, selectedPrice }: Iprops) => {
  const { errorNotification, successNotification } = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<DataPrice>({ defaultValues: selectedPrice ? selectedPrice : undefined })
  const onSubmit: SubmitHandler<DataPrice> = async (data) => {
    try {
      if (selectedPrice?.id) {
        const response = await updatePrice({ id: selectedPrice?.id, body: data })
        if (response) {
          successNotification('Thay đổi gói thành công')
          closeModalUpdate()
          reset()
        } else errorNotification('Thay đổi gói không thành công')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
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
        <div className={`text-red-500 absolute text-[12px]  ${errors.name ? 'visible' : 'invisible'}`}>
          {errors.name?.message}
        </div>
      </div>
      <div className='w-full md:w-[48%]  mt-5 relative'>
        <label className='font-bold '>
          Giá<sup className='text-red-500'>*</sup>
        </label>
        <input
          className={`${errors.price ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          type='number'
          placeholder='Nhập giá dịch vụ'
          {...register('price', {
            required: 'Giá không được để trống'
          })}
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.price ? 'visible' : 'invisible'}`}>
          {errors.price?.message}
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
        <div className={`text-red-500 absolute text-[12px] ${errors.description ? 'visible' : 'invisible'}`}>
          {errors.description?.message}
        </div>
      </div>
      <div className='w-full flex justify-end mt-6'>
        <button
          type='submit'
          className='middle  none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          Sửa
        </button>
        <button
          type='button'
          className='middle  none center mr-4 rounded-lg bg-[#49484d] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#49484d]  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
          onClick={closeModalUpdate}
        >
          Hủy
        </button>
      </div>
    </form>
  )
}
export default UpdatePrice
