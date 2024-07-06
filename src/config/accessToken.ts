import Cookies from 'js-cookie'
export const getAccessToken = () => {
  return Cookies.get('token_a')
}
export const setAccessToken = (token: string) => {
  Cookies.set('token_a', token)
}
export const removeAccessToken = () => {
  Cookies.remove('token_a')
}
export const hasAccessToken = () => {
  return !!Cookies.get('token_a')
}
