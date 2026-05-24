export function scoreTone(score) {
  if (score >= 80) return 'text-emerald-500'
  if (score >= 60) return 'text-amber-500'
  return 'text-rose-500'
}

export function scoreLabel(score) {
  if (score >= 85) return 'Market leader'
  if (score >= 70) return 'Strong momentum'
  if (score >= 50) return 'Watchlist'
  return 'Needs attention'
}

export function calculateGapScore(yourScore, competitorScore) {
  return Math.max(0, competitorScore - yourScore)
}
