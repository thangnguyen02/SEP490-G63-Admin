import { NotificationData } from '~/context/notiProvider.tsx'
import { adminInstance } from '../config/axiosConfig.ts'
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
  const response = await adminInstance.post('public/auth/login', { email, password })
  return response.data
}
export const registerUser = async ({ company, taxCode, presenter, email, phone, planpriceId }: RegisterData2) => {
  const response = await adminInstance.post('public/auth/register', {
    companyName: company,
    taxCode,
    presenter,
    email,
    phone,
    planpriceId
  })
  return response
}
export const getNotification = async (): Promise<NotificationData[]> => {
  const response = await adminInstance.get('notification')
  return response?.data?.content
}
