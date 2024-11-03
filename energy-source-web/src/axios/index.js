import store from '@/redux/store'
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
})

const axiosInstance = async (url, method = 'GET', data = null, token = null, headers = {}) => {
  try {
    const stateToken = store.getState()?.auth?.token
    const accessToken = token && token !== null ? token : stateToken

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }

    const response = await api({
      url,
      method,
      data,
      headers
    })

    return response
  } catch (error) {
    return error.response
  }
}

export default axiosInstance
