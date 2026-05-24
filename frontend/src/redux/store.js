import { configureStore } from '@reduxjs/toolkit'
import alertsReducer from './slices/alertsSlice'
import analyticsReducer from './slices/analyticsSlice'
import authReducer from './slices/authSlice'
import competitorsReducer from './slices/competitorsSlice'
import dashboardReducer from './slices/dashboardSlice'
import recommendationsReducer from './slices/recommendationsSlice'
import settingsReducer from './slices/settingsSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    competitors: competitorsReducer,
    dashboard: dashboardReducer,
    analytics: analyticsReducer,
    recommendations: recommendationsReducer,
    alerts: alertsReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
