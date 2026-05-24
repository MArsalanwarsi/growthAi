import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '@/components/common/Logo'
import ThemeToggle from '@/components/common/ThemeToggle'
import { Button } from '@/components/ui/button'
import { publicNavItems } from '@/constants/navigation'

function PublicNavbar() {
  const [open, setOpen] = useState(false)

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
        <Button className="md:hidden" size="icon" variant="surface" aria-label="Open navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      <div className={open ? 'border-t border-border/60 bg-background/95 px-4 py-4 md:hidden' : 'hidden'}>
        <nav className="grid gap-2">
          {publicNavItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mt-2 grid gap-2 border-t border-border/60 pt-3">
            <Button asChild variant="outline">
              <Link to="/login" onClick={() => setOpen(false)}>Log in</Link>
            </Button>
            <Button asChild variant="premium">
              <Link to="/signup" onClick={() => setOpen(false)}>Start free</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default PublicNavbar
