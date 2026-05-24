import { ArrowUpRight, Minus } from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

function StatCard({ metric }) {
  const Icon = metric.icon
  const TrendIcon = metric.trend === 'up' ? ArrowUpRight : Minus

  return (
    <Card className="relative overflow-hidden premium-card group" data-animate="stagger">
      <div className="absolute -right-6 -top-6 size-24 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-[10px] bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/10 text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
              <Icon className="size-[18px]" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
          </div>
          <Badge tone={metric.trend === 'warn' ? 'warning' : 'success'} className="px-2 py-0.5 shadow-sm font-bold text-[10px] uppercase tracking-wider">
            <TrendIcon className="size-3 mr-0.5" />
            {metric.change}
          </Badge>
        </div>
        <div className="mt-5 flex items-baseline gap-2">
          <p className="text-[2.25rem] leading-none font-bold tracking-tight text-foreground">
            <AnimatedCounter value={metric.value} suffix={metric.suffix} />
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatCard
