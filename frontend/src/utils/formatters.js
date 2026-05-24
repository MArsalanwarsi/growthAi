export function formatNumber(value) {
  return new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format(value)
}

export function formatCompactNumber(value) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatCurrency(value, currency = 'USD') {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPercent(value) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value}%`
}
