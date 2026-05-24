import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/api/axiosInstance';
import { competitorData } from '@/data/mockData';

export const fetchCompetitors = createAsyncThunk('competitors/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('/competitors');
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to fetch competitors');
  } catch (error) {
    console.warn('⚠️ Competitors API fetch failed, falling back to mock competitor list.', error.message);
    return competitorData;
  }
});

export const fetchCompetitorDetails = createAsyncThunk('competitors/fetchDetails', async (id, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(`/competitors/${id}`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to fetch competitor details');
  } catch (error) {
    console.warn(`⚠️ Competitor ${id} detail API fetch failed. Using premium mock structures.`, error.message);
    // Find in mock lists
    const match = competitorData.find(c => c.id === id) || competitorData[0];
    return {
      ...match,
      websiteUrl: 'https://vortexbrands.example.com',
      targetCountry: 'United States',
      social: {
        instagram: { followers: '240K', engagementRate: '4.8%', postingFrequency: '2.4 posts/day' },
        tiktok: { followers: '190K', engagementRate: '8.2%', postingFrequency: '3.0 posts/day' }
      },
      seo: { authorityScore: 68, organicTrafficEstimate: '85K/mo', organicKeywords: 4200 },
      ads: { activeAdCount: 45, estimatedMonthlyAdSpend: '$22K' },
      sentiment: { overallSentiment: 'Highly Positive' }
    };
  }
});

const initialState = {
  items: competitorData,
  selectedCompetitorDetails: null,
  selectedCompetitorId: competitorData[0]?.id || null,
  filters: {
    query: '',
    activity: 'All',
  },
  loading: false,
  error: null
};

const competitorsSlice = createSlice({
  name: 'competitors',
  initialState,
  reducers: {
    setSelectedCompetitor(state, action) {
      state.selectedCompetitorId = action.payload;
    },
    setCompetitorQuery(state, action) {
      state.filters.query = action.payload;
    },
    setCompetitorActivity(state, action) {
      state.filters.activity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompetitors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompetitors.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCompetitors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCompetitorDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompetitorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCompetitorDetails = action.payload;
        state.error = null;
      })
      .addCase(fetchCompetitorDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setCompetitorActivity, setCompetitorQuery, setSelectedCompetitor } = competitorsSlice.actions;
export default competitorsSlice.reducer;
