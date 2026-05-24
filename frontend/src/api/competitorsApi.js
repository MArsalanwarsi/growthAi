import apiClient from './axiosInstance'

export const competitorsApi = {
  list: (params) => apiClient.get('/competitors', { params }),
  detail: (id) => apiClient.get(`/competitors/${id}`),
  create: (payload) => apiClient.post('/competitors', payload),
  update: (id, payload) => apiClient.patch(`/competitors/${id}`, payload),
  discover: (payload) => apiClient.post('/competitors/discover', payload),
}

