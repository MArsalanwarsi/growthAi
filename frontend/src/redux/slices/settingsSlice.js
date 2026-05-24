import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: typeof window !== 'undefined' ? localStorage.getItem('growthradar_theme') || 'dark' : 'dark',
  notifications: {
    criticalAlerts: true,
    weeklyBriefs: true,
    competitorMoves: true,
  },
  integrations: {
    instagram: 'Ready',
    facebook: 'Ready',
    tiktok: 'Ready',
    shopify: 'Planned',
  },
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload
    },
    toggleNotification(state, action) {
      state.notifications[action.payload] = !state.notifications[action.payload]
    },
  },
})

export const { setTheme, toggleNotification } = settingsSlice.actions
export default settingsSlice.reducer
