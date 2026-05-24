import { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardSkeleton from '@/components/loaders/SkeletonLoaders'
import AuthLayout from '@/layouts/AuthLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import PublicLayout from '@/layouts/PublicLayout'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import SubscriptionGate from '@/components/common/SubscriptionGate'
import { authRoutes, protectedRoutes, publicRoutes } from './routeConfig'

function renderRoute(route) {
  const Element = route.element
  let elementNode = <Element />

  if (
    route.path === '/dashboard/suggestions' || 
    route.path === '/dashboard/battle-mode' || 
    route.path === '/dashboard/opportunities'
  ) {
    elementNode = (
      <SubscriptionGate requiredTier="Starter">
        <Element />
      </SubscriptionGate>
    )
  } else if (route.path === '/dashboard/reports') {
    elementNode = (
      <SubscriptionGate requiredTier="Pro">
        <Element />
      </SubscriptionGate>
    )
  }

  return <Route key={route.path} path={route.path} element={elementNode} />
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-6"><DashboardSkeleton /></div>}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route element={<PublicLayout />}>{publicRoutes.map(renderRoute)}</Route>
            <Route element={<AuthLayout />}>{authRoutes.map(renderRoute)}</Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>{protectedRoutes.map(renderRoute)}</Route>
          </Route>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter
