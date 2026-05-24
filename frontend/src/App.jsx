import AppRouter from '@/router/AppRouter'
import { useTheme } from '@/hooks/useTheme'

function App() {
  useTheme()

  return <AppRouter />
}

export default App
