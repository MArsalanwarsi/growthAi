import { X } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

function Dialog({ children, className, onClose, open, title }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4 backdrop-blur-md">
      <div className={cn('glass-panel w-full max-w-lg rounded-lg p-5', className)}>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button aria-label="Close dialog" size="icon" variant="ghost" onClick={onClose}>
            <X />
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}

export { Dialog }
