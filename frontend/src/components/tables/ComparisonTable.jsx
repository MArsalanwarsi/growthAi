import { Trophy } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

function ComparisonTable({ rows }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border/70">
      <Table>
        <TableHeader className="bg-muted/45">
          <TableRow>
            <TableHead>Metric</TableHead>
            <TableHead>Your Business</TableHead>
            <TableHead>Competitor</TableHead>
            <TableHead>Winner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.metric}>
              <TableCell className="font-semibold">{row.metric}</TableCell>
              <TableCell className={row.winner === 'you' ? 'text-primary' : ''}>{row.you}</TableCell>
              <TableCell className={row.winner === 'competitor' ? 'text-accent' : ''}>{row.competitor}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-2 rounded-md bg-muted px-2.5 py-1 text-xs font-semibold">
                  <Trophy className="size-3 text-primary" />
                  {row.winner === 'you' ? 'You' : row.winner === 'tie' ? 'Tie' : 'Competitor'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ComparisonTable
