import { adminInstance, adminInstanceFormData } from '../config/axiosConfig.ts'
interface DataGetCustomer {
  status?: string
  page: number
  size: number
  fromDate?: string
  toDate?: string
  name?: string
}
interface DataCustomer {
  status: string
  page: number
  size: number
  fromDate?: Date
  toDate?: Date
  name?: string
}
interface DataUpdateCustomer {
  id: string
  body: DataCustomer
}
export const getCustomer = async ({ status, fromDate, toDate, page, size, name }: DataGetCustomer) => {
  const params = { status, fromDate, toDate, page, size, name }
  const response = await adminInstance.get(`manager/company`, { params })
  return response.data
}
export const banCustomer = async (id: string) => {
  try {
    const response = await adminInstance.delete(`manager/company/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const approveCustomer = async (id: string) => {
  const response = await adminInstance.put(`manager/company/${id}`)
  return response.data
}
export const approveExtend = async (data: any) => {
  const response = await adminInstance.put(`manager/queueExtend`, data)
  return response.data
}
export const extendService = async (data: any) => {
  const response = await adminInstance.post(`manager/queueExtend/public`, data)
  return response.data
}
export const rejectExtend = async (id:string) => {
  const response = await adminInstance.post(`manager/queueExtend/${id}`)
  return response.data
}
export const updateCustomer = async ({ id, body }: DataUpdateCustomer) => {
  try {
    const response = await adminInstance.put(`manager/company/${id}`, body)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const getAllQueueExtend = async ({ page, size, status, fromDate, toDate }: any) => {
  const params = { page, size, status, fromDate, toDate }
  const response = await adminInstance.get(`manager/queueExtend`, { params })
  return response.data
}
export const uploadFileCompany = async (formData: any) => {
  const response = await adminInstanceFormData.put('manager/company/uploadContract', formData)
  return response
}
export const deleteQueueExtend = async (id: string) => {
  const response = await adminInstanceFormData
}
