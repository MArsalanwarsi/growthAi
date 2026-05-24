import { cn } from '@/lib/utils'

const toneClass = {
  default: 'border-border bg-muted text-muted-foreground',
  success: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
  warning: 'border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  danger: 'border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-300',
  premium: 'border-primary/25 bg-primary/10 text-primary',
  accent: 'border-accent/25 bg-accent/10 text-accent',
}

function Badge({ className, tone = 'default', ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-semibold',
        toneClass[tone],
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
