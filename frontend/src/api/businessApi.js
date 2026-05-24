import apiClient from './axiosInstance'

export const businessApi = {
  create: (payload) => apiClient.post('/business', payload),
  get: (id) => apiClient.get('/business', { params: { id } }),
  update: (payload) => apiClient.patch('/business', payload),
}

export default businessApi
