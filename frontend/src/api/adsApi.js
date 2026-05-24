import apiClient from './axiosInstance'

export const adsApi = {
  snapshot: (params) => apiClient.get('/ads/snapshot', { params }),
  competitors: (params) => apiClient.get('/ads/competitors', { params }),
  creatives: (params) => apiClient.get('/ads/creatives', { params }),
}
