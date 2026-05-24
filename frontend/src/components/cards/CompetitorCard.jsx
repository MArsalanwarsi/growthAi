import { ArrowUpRight, Megaphone, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatCompactNumber } from '@/utils/formatters'

function CompetitorCard({ competitor }) {
  return (
    <Card data-animate="stagger">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 font-semibold text-primary">
              {competitor.logo}
            </div>
            <div>
              <h3 className="font-semibold">{competitor.name}</h3>
              <p className="text-sm text-muted-foreground">{competitor.category}</p>
            </div>
          </div>
          <Badge tone="success">
            <ArrowUpRight className="size-3" />
            {competitor.growth}%
          </Badge>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-sm">
          <div className="rounded-lg bg-muted/35 p-3">
            <p className="text-muted-foreground">Followers</p>
            <p className="mt-1 font-semibold">{formatCompactNumber(competitor.followers)}</p>
          </div>
          <div className="rounded-lg bg-muted/35 p-3">
            <p className="text-muted-foreground">Engage</p>
            <p className="mt-1 font-semibold">{competitor.engagement}%</p>
          </div>
          <div className="rounded-lg bg-muted/35 p-3">
            <p className="text-muted-foreground">SEO</p>
            <p className="mt-1 font-semibold">{competitor.seoScore}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge tone="premium"><Megaphone className="size-3" /> {competitor.adActivity}</Badge>
          <Badge tone="accent"><Search className="size-3" /> {competitor.pricing}</Badge>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{competitor.winReason}</p>
        <Button asChild className="mt-5 w-full" variant="surface">
          <Link to={`/dashboard/competitors/${competitor.id}`}>Open intelligence</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default CompetitorCard
