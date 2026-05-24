import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: {
    businessName: 'Northstar Commerce',
    category: 'Ecommerce SaaS',
    website: 'northstar.example',
    targetCountry: 'United States',
    targetAudience: 'DTC founders and marketing operators',
    growthGoal: 'Increase qualified pipeline by 30%',
  },
  onboarding: {
    isComplete: false,
    currentStep: 0,
    data: {},
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload }
    },
    updateOnboardingData(state, action) {
      state.onboarding.data = { ...state.onboarding.data, ...action.payload }
    },
    setOnboardingStep(state, action) {
      state.onboarding.currentStep = action.payload
    },
    completeOnboarding(state, action) {
      state.onboarding.isComplete = true
      state.profile = { ...state.profile, ...action.payload }
    },
  },
})

export const { completeOnboarding, setOnboardingStep, updateOnboardingData, updateProfile } = userSlice.actions
export default userSlice.reducer
