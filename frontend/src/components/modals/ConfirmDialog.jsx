import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

function ConfirmDialog({ description, onClose, onConfirm, open, title }) {
  return (
    <Dialog open={open} title={title} onClose={onClose}>
      <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button variant="premium" onClick={onConfirm}>Confirm</Button>
      </div>
    </Dialog>
  )
}

export default ConfirmDialog
