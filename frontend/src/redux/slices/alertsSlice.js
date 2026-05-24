import { createSlice } from '@reduxjs/toolkit'
import { alerts } from '@/data/mockData'

const initialState = {
  items: alerts,
  unreadCount: alerts.length,
}

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlerts(state, action) {
      state.items = action.payload;
      state.unreadCount = action.payload.filter(a => !a.read).length;
    },
    addAlert(state, action) {
      // Prevent duplicates
      if (state.items.some((item) => item.id === action.payload.id)) return;
      state.items.unshift(action.payload);
      state.unreadCount += 1;
    },
    markAlertRead(state, action) {
      const alert = state.items.find((item) => item.id === action.payload);
      if (alert && !alert.read) {
        alert.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAlertsRead(state) {
      state.items.forEach((item) => {
        item.read = true;
      });
      state.unreadCount = 0;
    },
  },
})

export const { setAlerts, addAlert, markAlertRead, markAllAlertsRead } = alertsSlice.actions
export default alertsSlice.reducer

