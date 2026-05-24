import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { priorityLabels } from '@/utils/constants'

const toneMap = {
  high: 'danger',
  medium: 'warning',
  quick: 'success',
  opportunity: 'premium',
}

function RecommendationCard({ recommendation }) {
  const Icon = recommendation.icon

  return (
    <div className="premium-card flex flex-col justify-between p-5 bg-card border border-border/40 hover:border-primary/40 relative overflow-hidden group">
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary shadow-inner">
            {Icon ? <Icon className="size-5" /> : null}
          </div>
          <Badge tone={toneMap[recommendation.category] || 'default'} className="px-2 py-0.5 shadow-sm font-bold text-[10px] uppercase tracking-widest border-0">
            {priorityLabels[recommendation.category] || recommendation.category}
          </Badge>
        </div>
        <h3 className="mt-5 font-semibold text-foreground tracking-tight text-base leading-snug">{recommendation.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">{recommendation.description}</p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-border/40">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Impact</span>
          <span className="text-sm font-bold text-primary">{recommendation.impact}</span>
        </div>
        <Button size="sm" variant="outline" className="h-8 rounded-full px-4 text-xs font-semibold hover:bg-primary hover:text-primary-foreground border-border/60">
          Review
        </Button>
      </div>
    </div>
  )
}

export default RecommendationCard
