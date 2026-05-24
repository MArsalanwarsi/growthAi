import { cn } from '@/lib/utils'

function Table({ className, ...props }) {
  return <table className={cn('w-full border-collapse text-sm', className)} {...props} />
}

function TableHeader({ className, ...props }) {
  return <thead className={cn('text-muted-foreground', className)} {...props} />
}

function TableBody({ className, ...props }) {
  return <tbody className={cn('divide-y divide-border/60', className)} {...props} />
}

function TableRow({ className, ...props }) {
  return <tr className={cn('transition hover:bg-muted/35', className)} {...props} />
}

function TableHead({ className, ...props }) {
  return <th className={cn('px-4 py-3 text-left font-semibold', className)} {...props} />
}

function TableCell({ className, ...props }) {
  return <td className={cn('px-4 py-3 align-middle', className)} {...props} />
}

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow }
