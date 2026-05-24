export const chartColors = {
  primary: 'var(--chart-1)',
  cyan: 'var(--chart-2)',
  amber: 'var(--chart-3)',
  coral: 'var(--chart-4)',
  violet: 'var(--chart-5)',
}

export const chartPalette = [
  chartColors.primary,
  chartColors.cyan,
  chartColors.amber,
  chartColors.coral,
  chartColors.violet,
]

export const chartMargin = { top: 12, right: 18, left: -12, bottom: 4 }

export const tooltipStyle = {
  background: 'color-mix(in oklab, var(--popover) 92%, transparent)',
  border: '1px solid color-mix(in oklab, var(--border) 70%, transparent)',
  borderRadius: 8,
  boxShadow: '0 18px 45px rgba(0,0,0,0.18)',
  color: 'var(--popover-foreground)',
}
