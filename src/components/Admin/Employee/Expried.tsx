import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import LoadingIcon from '~/assets/LoadingIcon'
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

  const extendServiceQuery = useMutation(extendService, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    },
    onSuccess: () => {
      successNotification('Gia hạn dịch vụ thành công')
      closeModal()
    }
  })
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    extendServiceQuery.mutate({ companyId: selectedCustomer?.id, pricePlanId: data.pricePlan })
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
          disabled={extendServiceQuery?.isLoading}
          className='middle  none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          {extendServiceQuery?.isLoading ? <LoadingIcon /> : 'Chấp nhận'}
        </button>
        <button
          type='button'
          disabled={extendServiceQuery?.isLoading}
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
