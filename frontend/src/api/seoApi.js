import apiClient from './axiosInstance'

export const seoApi = {
  snapshot: (params) => apiClient.get('/seo/snapshot', { params }),
  keywords: (params) => apiClient.get('/seo/keywords', { params }),
  gaps: (params) => apiClient.get('/seo/gaps', { params }),
}
