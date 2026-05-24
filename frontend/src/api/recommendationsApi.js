import apiClient from './axiosInstance'

export const recommendationsApi = {
  list: (params) => apiClient.get('/recommendations', { params }),
  updateStatus: (id, payload) => apiClient.patch(`/recommendations/${id}`, payload),
}
