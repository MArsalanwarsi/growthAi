import axios from 'axios'
import { demoTokenKey } from '@/utils/constants'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem(demoTokenKey) : null

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const normalizedError = {
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message || 'Unexpected API error',
      details: error.response?.data || null,
    }

    return Promise.reject(normalizedError)
  },
)

export default apiClient
