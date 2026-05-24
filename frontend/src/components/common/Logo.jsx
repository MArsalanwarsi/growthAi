import { Radar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { brand } from '@/constants/brand'

function Logo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-lg border border-primary/30 bg-primary/15 text-primary shadow-[0_16px_35px_rgba(20,184,166,0.18)]">
        <Radar className="size-5" />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block text-sm font-bold text-foreground">{brand.name}</span>
          <span className="block text-xs text-muted-foreground">Signal intelligence</span>
        </span>
      )}
    </Link>
  )
}

export default Logo
