import { adminInstance } from '../config/axiosConfig.ts'
interface DataPrice {
  name: string
  description: string | null
  price: number
  timeWithYears: number
  discount: number
}
interface DataUpdatePrice {
  id: string
  body: DataPrice
}
export const getPrice = async () => {
  try {
    const response = await adminInstance.get('manager/pricePlan')
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const updatePrice = async ({ id, body }: DataUpdatePrice) => {
  try {
    const response = await adminInstance.put(`manager/pricePlan/${id}`, body)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const createPrice = async ({ name, description, price, timeWithYears, discount }: DataPrice) => {
  try {
    const response = await adminInstance.post('manager/pricePlan', {
      name,
      description,
      price,
      timeWithYears,
      discount
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const deletePrice = async (id: string) => {
  try {
    const response = await adminInstance.delete(`manager/pricePlan/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
