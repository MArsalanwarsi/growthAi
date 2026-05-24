import { useSelector } from 'react-redux'

export function useDashboardMetrics() {
  return useSelector((state) => ({
    metrics: state.dashboard.metrics,
    monthlyGrowth: state.dashboard.monthlyGrowth,
    seoSnapshot: state.dashboard.seoSnapshot,
    adsSnapshot: state.dashboard.adsSnapshot,
    alerts: state.alerts.items,
    recommendations: state.recommendations.items,
    opportunities: state.dashboard.opportunities,
  }))
}
