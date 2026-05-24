import { Badge } from '@/components/ui/badge'

const toneMap = {
  critical: 'danger',
  high: 'warning',
  medium: 'premium',
}

function AlertCard({ alert }) {
  const Icon = alert.icon

  return (
    <div className="group relative flex items-start gap-3 rounded-lg border border-border/40 bg-card p-4 transition-all hover:bg-muted/30 hover:border-border/80">
      <div className="absolute left-0 top-1/2 -mt-4 h-8 w-0.5 rounded-r-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-gradient-to-br from-background to-muted border border-border/50 text-primary shadow-sm">
        {Icon ? <Icon className="size-4.5" /> : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold tracking-tight text-foreground leading-tight">{alert.title}</p>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{alert.message || 'Signal anomaly detected.'}</p>
        <div className="mt-2.5 flex items-center justify-between gap-2">
          <Badge tone={toneMap[alert.severity] || 'default'} className="px-1.5 py-0 shadow-none font-bold text-[9px] uppercase tracking-wider">
            {alert.severity}
          </Badge>
          <span className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wide">{alert.time || 'Just now'}</span>
        </div>
      </div>
    </div>
  )
}

export default AlertCard
