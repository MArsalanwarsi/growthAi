import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { chartColors, tooltipStyle } from '@/utils/chartHelpers'

function PremiumRadarChart({ data, height = 300 }) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="name" tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Radar dataKey="you" stroke={chartColors.primary} fill={chartColors.primary} fillOpacity={0.22} strokeWidth={2} />
          <Radar dataKey="leader" stroke={chartColors.amber} fill={chartColors.amber} fillOpacity={0.12} strokeWidth={2} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PremiumRadarChart
