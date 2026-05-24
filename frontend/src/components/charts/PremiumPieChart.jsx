import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { chartPalette, tooltipStyle } from '@/utils/chartHelpers'

function PremiumPieChart({ data, height = 260 }) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={4}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={chartPalette[index % chartPalette.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PremiumPieChart
