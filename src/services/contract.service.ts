import { adminInstance, adminInstanceFormData } from '~/config/axiosConfig'

type SignRequest = {
  contractId: string
  signImage: string
  comment: string
  createdBy: string
  customer: boolean
}
export const createOldContract = async (formData: any) => {
  const response = await adminInstanceFormData.post(`old-contract`, formData)
  return response.data
}
export const getOldContract = async (page: number, size: number) => {
  const response = await adminInstance.get(`old-contract?page=${page}&size=${size}`)
  return response.data
}
export const deleteOldContract = async (id: string) => {
  const response = await adminInstance.delete(`old-contract/${id}`)
  return response.data
}

export const sendMail = async (formData: any) => {
  const response = await adminInstanceFormData.post(`contract/send-mail`, formData)
  return response.data
}
export const sendMailPublic = async (formData: any) => {
  const response = await adminInstanceFormData.post(`contract/public/send-mail`, formData)
  return response.data
}

export const createNewContract = async (data: any) => {
  const response = await adminInstance.post(`contract`, data)
  return response.data
}
export const getNewContract = async (page: number, size: number, statusContract: string) => {
  const response = await adminInstance.get(`contract/${page}/${size}?status=${statusContract}`)
  return response.data
}
export const getNewContractById = async (id: any) => {
  const response = await adminInstance.get(`contract/${id}`)
  return response.data
}
export const getNewContractByIdNotToken = async (id: any) => {
  const response = await adminInstance.get(`contract/public/sign-contract/${id}`)
  return response.data
}

export const updateNewContract = async (data: any) => {
  const response = await adminInstance.post(`contract`, data)
  return response.data
}

export const deleteNewContract = async (id: string) => {
  const response = await adminInstance.delete(`contract/${id}`)
  return response.data
}

export const getContractHistory = async (contract: string) => {
  const response = await adminInstance.get(`contract-history?contract=${contract}`)
  return response.data
}
export const getDataByTaxNumber = async (id: string) => {
  const response = await adminInstance.get(`contract/party/${id}`)
  return response.data
}
export const getSearchContract = async ({ fieldSearch, data }: any) => {
  const response = await adminInstance.post(`${fieldSearch}/search`, data)
  return response.data
}
export const signContract = async (data: SignRequest) => {
  const response = await adminInstance.post(`contract/public/sign-contract`, data)
  return response.data
}
export const managerCount = async () => {
  const response = await adminInstance.get('contract/getNumberContractNoti')
  return response.data
}
