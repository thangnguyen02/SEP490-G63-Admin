import { NotificationData } from '~/context/notiProvider.tsx'
import { adminInstance } from '../config/axiosConfig.ts'
interface LoginData {
  email: string
  password: string
}

interface RegisterData2 {
  company: string
  taxCode: string
  presenter: string
  email: string
  phone: string
  planpriceId: string
}
type UserList = {
  label: string
  value: string
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
export const getNotification = async (page: number) => {
  const response = await adminInstance.get(`notification?page=${page}&size=10`)
  return response?.data
}
export const getUserByPermission = async (permission: string): Promise<UserList[]> => {
  const response = await adminInstance.get(`user/searchByPermission?permission=${permission}`)
  const result = response.data?.object?.content.map((d: any) => ({ label: d.email, value: d.email }))
  return result as UserList[]
}
