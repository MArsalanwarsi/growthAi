import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

function TrendCard({ item }) {
  const Icon = item.icon

  return (
    <div className="rounded-lg border border-border/70 bg-muted/20 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <Badge tone="success">
          <ArrowUpRight className="size-3" />
          {item.score}
        </Badge>
      </div>
      <h3 className="mt-4 font-semibold">{item.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{item.type}</p>
    </div>
  )
}

export default TrendCard
