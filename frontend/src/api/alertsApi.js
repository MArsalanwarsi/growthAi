import apiClient from './axiosInstance'

export const alertsApi = {
  list: (params) => apiClient.get('/alerts', { params }),
  markRead: (id) => apiClient.patch(`/alerts/${id}/read`),
}
