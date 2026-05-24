import { Menu } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '@/components/common/Logo'
import ThemeToggle from '@/components/common/ThemeToggle'
import { Button } from '@/components/ui/button'
import { publicNavItems } from '@/constants/navigation'

function PublicNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/78 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {publicNavItems.map((item) => (
            <NavLink key={item.label} to={item.href} className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button asChild variant="ghost">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild variant="premium">
            <Link to="/signup">Start free</Link>
          </Button>
        </div>
        <Button className="md:hidden" size="icon" variant="surface" aria-label="Open navigation">
          <Menu />
        </Button>
      </div>
    </header>
  )
}

export default PublicNavbar
