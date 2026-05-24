import { cn } from '@/lib/utils'

function Card({ className, ...props }) {
  return <div className={cn('premium-card', className)} {...props} />
}

function CardHeader({ className, ...props }) {
  return <div className={cn('space-y-2 p-5 pb-3', className)} {...props} />
}

function CardTitle({ className, ...props }) {
  return <h3 className={cn('text-base font-semibold text-foreground', className)} {...props} />
}

function CardDescription({ className, ...props }) {
  return <p className={cn('text-sm leading-6 text-muted-foreground', className)} {...props} />
}

function CardContent({ className, ...props }) {
  return <div className={cn('p-5 pt-2', className)} {...props} />
}

export { Card, CardContent, CardDescription, CardHeader, CardTitle }
