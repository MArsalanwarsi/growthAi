import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logout, signupUser, startDemoSession } from '@/redux/slices/authSlice'

export function useAuth() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  return {
    ...auth,
    login: (payload) => dispatch(loginUser(payload)),
    signup: (payload) => dispatch(signupUser(payload)),
    startDemo: () => dispatch(startDemoSession()),
    logout: () => dispatch(logout()),
  }
}
