import apiClient from './axiosInstance'

export const analyticsApi = {
  social: (params) => apiClient.get('/analytics/social', { params }),
  content: (params) => apiClient.get('/analytics/content', { params }),
  sentiment: (params) => apiClient.get('/analytics/sentiment', { params }),
  trends: (params) => apiClient.get('/analytics/trends', { params }),
}
