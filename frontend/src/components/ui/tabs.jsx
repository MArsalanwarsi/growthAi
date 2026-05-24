import { cn } from '@/lib/utils'

function Tabs({ tabs, activeTab, onChange, className }) {
  return (
    <div className={cn('flex flex-wrap gap-2 rounded-md border border-border/70 bg-muted/40 p-1', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={cn(
            'rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground',
            activeTab === tab.value && 'bg-background text-foreground shadow-sm',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export { Tabs }
