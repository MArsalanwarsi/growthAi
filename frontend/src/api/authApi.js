import apiClient from './axiosInstance'

export const authApi = {
  login: (payload) => apiClient.post('/auth/login', payload),
  signup: (payload) => apiClient.post('/auth/signup', payload),
  forgotPassword: (payload) => apiClient.post('/auth/forgot-password', payload),
  resetPassword: (payload) => apiClient.post('/auth/reset-password', payload),
  me: () => apiClient.get('/auth/me'),
  updateProfile: (payload) => apiClient.patch('/auth/profile', payload),
}

