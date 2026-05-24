import { Badge } from '@/components/ui/badge'

function SectionHeader({ eyebrow, title, description, centered = false }) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <Badge tone="accent">{eyebrow}</Badge>}
      <h2 className="mt-4 text-2xl font-semibold leading-tight md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-sm leading-6 text-muted-foreground md:text-base">{description}</p>}
    </div>
  )
}

export default SectionHeader
