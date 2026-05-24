import { scoreLabel } from '@/utils/scoreCalculators'

function GrowthScoreGauge({ score = 84 }) {
  const circumference = 2 * Math.PI * 52
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative size-40">
        <svg className="size-40 -rotate-90">
          <circle cx="80" cy="80" r="52" stroke="var(--border)" strokeWidth="13" fill="transparent" />
          <circle
            cx="80"
            cy="80"
            r="52"
            stroke="var(--primary)"
            strokeWidth="13"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-4xl font-semibold">{score}</p>
            <p className="text-xs text-muted-foreground">out of 100</p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="font-semibold">{scoreLabel(score)}</p>
        <p className="text-sm text-muted-foreground">Momentum is above category median.</p>
      </div>
    </div>
  )
}

export default GrowthScoreGauge
