import { cn } from '@/lib/utils'

function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground transition placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
        className,
      )}
      {...props}
    />
  )
}

function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'min-h-28 w-full rounded-md border border-border bg-card px-3 py-3 text-sm text-foreground transition placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
        className,
      )}
      {...props}
    />
  )
}

export { Input, Textarea }
