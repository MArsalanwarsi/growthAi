import { cva } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-md border text-sm font-semibold transition-all duration-200 focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-[1px]',
        premium:
          'border-transparent bg-accent text-accent-foreground hover:bg-accent/90 hover:-translate-y-[1px] shadow-sm',
        outline:
          'border-border/80 bg-background/50 text-foreground hover:border-primary/50 hover:bg-primary/5',
        ghost:
          'border-transparent bg-transparent text-muted-foreground hover:bg-muted/70 hover:text-foreground',
        surface:
          'border-border/70 bg-card text-foreground shadow-sm hover:border-primary/30 hover:bg-muted/10',
        destructive:
          'border-destructive/30 bg-destructive/12 text-destructive hover:bg-destructive/20',
      },
      size: {
        sm: 'h-9 px-3',
        default: 'h-10 px-4',
        lg: 'h-12 px-5',
        icon: 'size-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot.Root : 'button'

  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button }
