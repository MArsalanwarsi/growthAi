import apiClient from './axiosInstance'

export const dashboardApi = {
  getOverview: () => apiClient.get('/dashboard/overview'),
  getMetrics: (params) => apiClient.get('/dashboard/metrics', { params }),
  getTrends: (params) => apiClient.get('/dashboard/trends', { params }),
}
