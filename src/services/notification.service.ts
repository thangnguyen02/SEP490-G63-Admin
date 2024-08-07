import { adminInstance } from '~/config/axiosConfig'
export const getNumberUnreadNotify = async () => {
  const response = await adminInstance.get(`notification/unread`)
  return response.data
}
export const readNotify = async (id: string) => {
  const response = await adminInstance.put(`notification/${id}/true`)
  return response.data
}
export const deleteNotify = async (id: string) => {
  const response = await adminInstance.delete(`notification/${id}`)
  return response.data
}
