import apiClient from './axiosInstance'

export const recommendationsApi = {
  list: (payload) => apiClient.post('/ai/recommendations', payload || {}),
  updateStatus: (id, payload) => Promise.resolve({ success: true, data: { id, ...payload } }),
}
