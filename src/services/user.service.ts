import { NotificationData } from '~/context/notiProvider.tsx'
import axiosInstant, { adminInstance } from '../config/axiosConfig.ts'
interface LoginData {
  email: string
  password: string
}
interface RegisterData1 {
  company: string
  taxCode: string
  firstName: string
  lastName: string
  email: string
  phone: string
}
interface RegisterData2 {
  company: string
  taxCode: string
  presenter: string
  email: string
  phone: string
  planpriceId: string
}
export const login = async ({ email, password }: LoginData) => {
  try {
    const response = await adminInstance.post('public/auth/login', { email, password })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const registerUser = async ({ company, taxCode, presenter, email, phone, planpriceId }: RegisterData2) => {
  try {
    const response = await adminInstance.post('public/auth/register', {
      companyName: company,
      taxCode,
      presenter,
      email,
      phone,
      planpriceId
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
export const register = async ({ company, taxCode, firstName, lastName, email, phone }: RegisterData1) => {
  try {
    const response = await adminInstance.post('', { company, taxCode, firstName, lastName, email, phone })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const getNotification = async (): Promise<NotificationData[]> => {
  const response = await axiosInstant.get('notification')
  return response?.data?.content
}
