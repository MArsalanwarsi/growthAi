import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

const authPaths = ['/login', '/signup', '/forgot-password', '/reset-password']

function PublicRoute() {
  const { isAuthenticated } = useAuth()
  const isAuthPath = authPaths.includes(window.location.pathname)

  if (isAuthenticated && isAuthPath) {
    return <Navigate replace to="/dashboard" />
  }

  return <Outlet />
}

export default PublicRoute
