import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '@/redux/slices/settingsSlice'
import { themeKey } from '@/utils/constants'

export function useTheme() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.settings.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(themeKey, theme)
  }, [theme])

  return {
    theme,
    setTheme: (nextTheme) => dispatch(setTheme(nextTheme)),
    toggleTheme: () => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark')),
  }
}
