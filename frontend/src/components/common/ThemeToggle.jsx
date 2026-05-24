import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const Icon = theme === 'dark' ? Sun : Moon

  return (
    <Button aria-label="Toggle theme" size="icon" variant="surface" onClick={toggleTheme}>
      <Icon />
    </Button>
  )
}

export default ThemeToggle
