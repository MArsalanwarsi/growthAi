import { useDispatch, useSelector } from 'react-redux'
import { demoLogin, demoSignup, logout } from '@/redux/slices/authSlice'

export function useAuth() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  return {
    ...auth,
    login: (payload) => dispatch(demoLogin(payload)),
    signup: (payload) => dispatch(demoSignup(payload)),
    logout: () => dispatch(logout()),
  }
}
