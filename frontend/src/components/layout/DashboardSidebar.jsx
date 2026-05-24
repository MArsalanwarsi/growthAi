import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '@/components/common/Logo'
import { Badge } from '@/components/ui/badge'
import { dashboardNavItems } from '@/constants/navigation'
import { cn } from '@/lib/utils'

function DashboardSidebar() {
  return (
    <aside className="hidden min-h-screen w-[280px] border-r border-border/40 bg-background/95 backdrop-blur-3xl lg:fixed lg:inset-y-0 lg:flex lg:flex-col shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] z-40">
      <div className="flex h-18 items-center px-6 border-b border-border/40">
        <Logo />
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-premium">
        <div className="mb-8 rounded-xl bg-gradient-to-br from-primary/10 to-transparent p-5 border border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 22h20L12 2zm0 3.8L18.2 19H5.8L12 5.8z" />
            </svg>
          </div>
          <Badge tone="success" className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0 uppercase tracking-widest text-[10px] font-bold mb-3">
            Live Intelligence
          </Badge>
          <p className="text-sm font-semibold text-foreground tracking-tight leading-tight mb-1">
            Command Center
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            API-ready architecture mapping real-time market movements.
          </p>
        </div>

        <nav className="space-y-1.5">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-3 mt-4">
            Analytics & Insights
          </p>
          
          {dashboardNavItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) =>
                  cn(
                    'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out overflow-hidden',
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(99,102,241,0.2)]' 
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 bg-primary"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <div className={cn(
                      "relative z-10 flex items-center gap-3 w-full",
                      isActive ? "text-primary-foreground" : ""
                    )}>
                      <Icon className={cn(
                        "size-[18px] transition-transform duration-200",
                        isActive ? "scale-110" : "group-hover:scale-110"
                      )} />
                      <span className="tracking-wide">{item.label}</span>
                    </div>
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-border/40">
        <div className="flex items-center gap-3 rounded-xl p-3 bg-card border border-border/50 shadow-sm">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-xs font-medium text-muted-foreground">System Status: Optimal</p>
        </div>
      </div>
    </aside>
  )
}

export default DashboardSidebar
