import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useToast from '~/hooks/useToast'
import { DataPrice } from '~/pages/Admin/Price'

import { DataCustomer } from '~/pages/Admin/User'
import { extendService } from '~/services/customer.service'
import { getPrice } from '~/services/price.service'

interface Iprops {
  closeModal: () => void
  selectedCustomer: DataCustomer | null
}
type FormData = {
  pricePlan: string
}
const Expried = ({ closeModal, selectedCustomer }: Iprops) => {
  const { errorNotification, successNotification } = useToast()
  const [data, setData] = useState<DataPrice[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (selectedCustomer?.id) {
        const response = await extendService(selectedCustomer?.id, data.pricePlan)
        if (response) {
          successNotification('Gia hạn dịch vụ thành công')
          closeModal()
        } else errorNotification('Gia hạn dịch vụ không thành công')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await getPrice()
      if (data) {
        setData(data)
      }
    }
    fetchAPI()
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>Hãy lựa chọn gói dịch vụ sẽ được kích hoạt với công ty {selectedCustomer?.companyName}.</div>
      <select
        {...register('pricePlan', {
          required: 'Gói được để trống'
        })}
      >
        {data?.map((d) => <option value={d.id}>{d.name}</option>)}
      </select>
      <div className='w-full flex justify-end mt-6'>
        <button
          type='submit'
          className='middle  none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
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
    </form>
  )
}
export default Expried
