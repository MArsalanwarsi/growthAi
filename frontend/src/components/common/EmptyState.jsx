import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

function EmptyState({ title, description, actionLabel = 'Create signal' }) {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-border/80 bg-muted/25 p-10 text-center">
      <div className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary">
        <Sparkles className="size-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      <Button className="mt-5" variant="outline">{actionLabel}</Button>
    </div>
  )
}

export default EmptyState
