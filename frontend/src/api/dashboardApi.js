import apiClient from './axiosInstance'

export const dashboardApi = {
  getOverview: () => apiClient.get('/analytics/dashboard'),
  getMetrics: () => apiClient.get('/analytics/growth-score'),
  getTrends: () => apiClient.get('/analytics/predictions'),
}
