import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/api/axiosInstance';
import { demoTokenKey, demoUserKey, demoWorkspaceUser } from '@/utils/constants';

const readStoredSession = () => {
  if (typeof window === 'undefined') return { token: null, user: null };

  const token = localStorage.getItem(demoTokenKey);
  const user = localStorage.getItem(demoUserKey);

  try {
    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  } catch {
    localStorage.removeItem(demoTokenKey);
    localStorage.removeItem(demoUserKey);
    return { token: null, user: null };
  }
};

const persistSession = (user, token) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(demoTokenKey, token);
  localStorage.setItem(demoUserKey, JSON.stringify(user));
};

const clearSession = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(demoTokenKey);
  localStorage.removeItem(demoUserKey);
};

const storedSession = readStoredSession();

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    if (response.success && response.data) {
      persistSession(response.data.user, response.data.token);
      return response.data;
    }
    throw new Error(response.message || 'Login failed');
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to log in with those credentials.');
  }
});

export const signupUser = createAsyncThunk('auth/signup', async (details, { rejectWithValue }) => {
  try {
    const response = await apiClient.post('/auth/register', details);
    if (response.success && response.data) {
      persistSession(response.data.user, response.data.token);
      return response.data;
    }
    throw new Error(response.message || 'Registration failed');
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to create the workspace.');
  }
});

export const updateUserTier = createAsyncThunk('auth/updateTier', async (tier, { getState, rejectWithValue }) => {
  const currentUser = getState().auth.user;

  if (currentUser?.isDemo) {
    const updatedUser = { ...currentUser, tier: 'Business' };
    persistSession(updatedUser, getState().auth.token);
    return updatedUser;
  }

  try {
    const response = await apiClient.patch('/auth/profile', { tier });
    if (response.success && response.data) {
      const stored = localStorage.getItem(demoUserKey);
      if (stored) {
        const userObj = JSON.parse(stored);
        userObj.tier = response.data.tier;
        localStorage.setItem(demoUserKey, JSON.stringify(userObj));
      }
      return response.data;
    }
    throw new Error(response.message || 'Profile update failed');
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to update subscription tier.');
  }
});

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
  try {
    const response = await apiClient.get('/auth/me');
    return response.data;
  } catch {
    return storedSession.user;
  }
});

const initialState = {
  isAuthenticated: Boolean(storedSession.token),
  token: storedSession.token,
  user: storedSession.user,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startDemoSession(state) {
      const user = demoWorkspaceUser;
      const token = `demo-token-${Date.now()}`;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      state.status = 'authenticated';
      state.error = null;
      persistSession(user, token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.status = 'idle';
      clearSession();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserTier.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserTier.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { startDemoSession, logout } = authSlice.actions;
export default authSlice.reducer;
