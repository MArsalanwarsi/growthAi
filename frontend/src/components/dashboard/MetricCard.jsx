import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

function MetricCard({ title, description, children, action, className }) {
  return (
    <Card className={cn("relative overflow-hidden premium-card group", className)} data-animate="stagger">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4 border-b border-border/40 relative z-10">
        <div>
          <CardTitle className="text-base tracking-tight">{title}</CardTitle>
          {description && <CardDescription className="text-xs mt-1 max-w-[90%] leading-relaxed">{description}</CardDescription>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </CardHeader>
      <CardContent className="pt-6 relative z-10">{children}</CardContent>
    </Card>
  )
}

export default MetricCard
