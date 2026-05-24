import { createSlice } from '@reduxjs/toolkit'
import { contentMix, engagementTrend, trafficTrends } from '@/data/mockData'

const initialState = {
  engagementTrend,
  contentMix,
  trafficTrends,
  activeChannel: 'All channels',
}

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setActiveChannel(state, action) {
      state.activeChannel = action.payload
    },
  },
})

export const { setActiveChannel } = analyticsSlice.actions
export default analyticsSlice.reducer
