import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

function PricingCard({ plan }) {
  return (
    <Card className={cn(plan.featured && 'border-primary/60 bg-primary/8 shadow-[0_24px_80px_rgba(20,184,166,0.16)]')}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold">{plan.name}</h3>
          {plan.featured && <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">Best value</span>}
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{plan.description}</p>
        <div className="mt-6 flex items-end gap-2">
          <span className="text-4xl font-semibold">{plan.price}</span>
          {plan.price.startsWith('$') && <span className="pb-1 text-sm text-muted-foreground">/mo</span>}
        </div>
        <Button className="mt-6 w-full" variant={plan.featured ? 'premium' : 'outline'}>{plan.cta}</Button>
        <ul className="mt-6 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default PricingCard
