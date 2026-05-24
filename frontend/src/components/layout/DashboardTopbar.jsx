import { Bell, LogOut, Menu, Search, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ThemeToggle from '@/components/common/ThemeToggle'
import { Button } from '@/components/ui/button'
import { dashboardNavItems } from '@/constants/navigation'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

function DashboardTopbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border/40 bg-background/80 backdrop-blur-2xl lg:pl-[280px]">
      <div className="flex h-18 items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <Button className="lg:hidden" size="icon" variant="surface" aria-label="Open dashboard navigation" onClick={() => setMobileOpen((value) => !value)}>
          {mobileOpen ? <X /> : <Menu />}
        </Button>
        
        <div className="hidden w-full max-w-lg items-center gap-3 rounded-full border border-border/60 bg-muted/30 px-4 py-2 text-sm text-muted-foreground shadow-sm transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 md:flex">
          <Search className="size-4 text-muted-foreground/70" />
          <input 
            type="text" 
            placeholder="Search competitors, campaigns, or strategic insights..." 
            className="bg-transparent border-none outline-none w-full text-foreground placeholder:text-muted-foreground/70"
          />
          <div className="flex items-center gap-1">
            <kbd className="inline-flex h-5 items-center gap-1 rounded border border-border/50 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex rounded-full border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary gap-2 h-9">
            <Sparkles className="size-3.5" />
            <span className="font-semibold text-xs tracking-wide">{user?.tier || 'Free'} Tier</span>
          </Button>

          <div className="h-6 w-px bg-border/50 hidden sm:block mx-1" />

          <ThemeToggle />
          
          <div className="relative">
          <Button size="icon" variant="ghost" className="relative rounded-full hover:bg-muted/50 text-muted-foreground" aria-label="Notifications" onClick={() => setNotificationsOpen((value) => !value)}>
            <Bell className="size-5" />
            <span className="absolute top-2 right-2.5 size-2 rounded-full bg-destructive border-2 border-background" />
          </Button>
          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] rounded-lg border border-border/70 bg-card p-3 text-sm shadow-xl">
              <p className="font-semibold">Live alerts</p>
              <div className="mt-3 space-y-2">
                {[
                  'Vortex Brands increased Meta ad activity by 14%.',
                  'SEO opportunity detected for comparison keywords.',
                  'Weekly executive brief is ready for export.',
                ].map((item) => (
                  <div key={item} className="rounded-md border border-border/50 bg-muted/30 p-3 text-xs text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
          
          <div className="hidden items-center gap-3 rounded-full border border-border/50 bg-card/50 pl-1 pr-3 py-1 sm:flex hover:bg-muted/30 transition-colors cursor-pointer">
            <div className="grid size-8 place-items-center rounded-full bg-gradient-to-tr from-primary to-primary/70 text-xs font-bold text-primary-foreground shadow-sm">
              {user?.name?.slice(0, 2).toUpperCase() || 'GR'}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-foreground">{user?.name || 'Growth Operator'}</p>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{user?.role || 'Owner'}</p>
            </div>
          </div>
          
          <Button size="icon" variant="ghost" className="rounded-full hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors" aria-label="Log out" onClick={handleLogout}>
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="grid gap-1 border-t border-border/50 bg-background/95 px-4 py-3 lg:hidden">
          {dashboardNavItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
                    isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                  )
                }
              >
                <Icon className="size-4" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
      )}
    </header>
  )
}

export default DashboardTopbar
