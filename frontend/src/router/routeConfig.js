import { lazy } from 'react'

export const publicRoutes = [
  { path: '/', element: lazy(() => import('@/pages/public/LandingPage')) },
  { path: '/pricing', element: lazy(() => import('@/pages/public/PricingPage')) },
]

export const authRoutes = [
  { path: '/login', element: lazy(() => import('@/features/auth/LoginPage')) },
  { path: '/signup', element: lazy(() => import('@/features/auth/SignupPage')) },
  { path: '/forgot-password', element: lazy(() => import('@/features/auth/ForgotPasswordPage')) },
  { path: '/reset-password', element: lazy(() => import('@/features/auth/ResetPasswordPage')) },
]

export const protectedRoutes = [
  { path: '/onboarding', element: lazy(() => import('@/features/onboarding/BusinessOnboardingPage')) },
  { path: '/dashboard', element: lazy(() => import('@/pages/dashboard/DashboardHome')) },
  { path: '/dashboard/competitors', element: lazy(() => import('@/pages/dashboard/CompetitorsPage')) },
  { path: '/dashboard/competitors/:id', element: lazy(() => import('@/pages/dashboard/CompetitorDetailsPage')) },
  { path: '/dashboard/why-they-win', element: lazy(() => import('@/pages/dashboard/WhyTheyWinPage')) },
  { path: '/dashboard/suggestions', element: lazy(() => import('@/pages/dashboard/AiSuggestionsPage')) },
  { path: '/dashboard/battle-mode', element: lazy(() => import('@/pages/dashboard/BattleModePage')) },
  { path: '/dashboard/opportunities', element: lazy(() => import('@/pages/dashboard/OpportunitiesPage')) },
  { path: '/dashboard/reports', element: lazy(() => import('@/pages/dashboard/ReportsPage')) },
  { path: '/dashboard/settings', element: lazy(() => import('@/pages/dashboard/SettingsPage')) },
]
