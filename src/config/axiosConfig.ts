import axios from 'axios'
import { BASE_URL, BASE_ADMIN_URL, FORBIDDEN, NOT_FOUND, UNAUTHORIZED, BASE_PROVINCE_URL } from '~/common/const'
import { getAccessToken, removeAccessToken } from './accessToken'
export const adminInstance = axios.create({
  baseURL: BASE_ADMIN_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})
export const adminInstanceFormData = axios.create({
  baseURL: BASE_ADMIN_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/multipart'
  }
})
export const provinceInstance = axios.create({
  baseURL: BASE_PROVINCE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})
adminInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken()
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

adminInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    switch (error?.response?.status) {
      case UNAUTHORIZED:
        removeAccessToken()
        window.location.href = '/login'
        break

      case NOT_FOUND:
        window.location.href = '/not-found'
        break
    }

    return Promise.reject(error)
  }
)

