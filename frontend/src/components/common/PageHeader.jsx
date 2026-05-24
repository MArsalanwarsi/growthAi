import { Badge } from '@/components/ui/badge'

function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl space-y-3">
        {eyebrow && <Badge tone="premium">{eyebrow}</Badge>}
        <div>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">{title}</h1>
          {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

export default PageHeader
