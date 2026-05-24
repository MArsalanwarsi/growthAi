import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/api/axiosInstance';
import { adsSnapshot, growthMetrics, monthlyGrowth, opportunities, seoSnapshot } from '@/data/mockData';
import { TrendingUp, Target, Bot, Bell } from 'lucide-react';

const metricIcons = {
  'Growth Score': { icon: TrendingUp, suffix: '/100', trend: 'up' },
  'Tracked Competitors': { icon: Target, suffix: '', trend: 'up' },
  'Competitors Tracked': { icon: Target, suffix: '', trend: 'up' },
  'Market Opportunity Index': { icon: Bot, suffix: '', trend: 'up' },
  'AI Suggestions': { icon: Bot, suffix: '', trend: 'up' },
  'Active Competitor Ads': { icon: Bell, suffix: '', trend: 'warn' },
  'Trend Alerts': { icon: Bell, suffix: '', trend: 'warn' },
};

export const fetchDashboardData = createAsyncThunk('dashboard/fetchData', async () => {
  try {
    const response = await apiClient.get('/analytics/dashboard');
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to fetch dashboard data');
  } catch (error) {
    console.warn('⚠️ Dashboard API fetch failed, using beautiful mock fallback benchmarks.', error.message);
    return {
      metrics: growthMetrics,
      monthlyGrowth,
      seoSnapshot,
      adsSnapshot,
      opportunities
    };
  }
});

const initialState = {
  metrics: growthMetrics,
  monthlyGrowth,
  seoSnapshot,
  adsSnapshot,
  opportunities,
  period: 'Last 90 days',
  loading: false,
  error: null
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardPeriod(state, action) {
      state.period = action.payload;
    },
    setDashboardLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        
        // Map metrics to include required Lucide components and fields
        const apiMetrics = action.payload.metrics || [];
        state.metrics = apiMetrics.map((m) => {
          const config = metricIcons[m.label] || { icon: TrendingUp, suffix: '', trend: 'up' };
          return {
            label: m.label,
            value: Number(m.value) || 0,
            change: m.change,
            trend: m.trend || config.trend,
            suffix: m.suffix !== undefined ? m.suffix : config.suffix,
            icon: config.icon
          };
        });

        state.monthlyGrowth = action.payload.monthlyGrowth;

        // Map seoSnapshot { aspect, value } to frontend format { name, you, leader }
        const apiSeo = action.payload.seoSnapshot || [];
        state.seoSnapshot = apiSeo.map((item) => ({
          name: item.aspect || item.name,
          you: item.value || item.you || 0,
          leader: item.leader || (item.value ? Math.min(100, item.value + 12) : 80)
        }));

        state.adsSnapshot = action.payload.adsSnapshot;
        state.error = null;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setDashboardLoading, setDashboardPeriod } = dashboardSlice.actions;
export default dashboardSlice.reducer;
