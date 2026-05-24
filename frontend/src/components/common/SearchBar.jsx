import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

function SearchBar({ onChange, placeholder = 'Search', value }) {
  return (
    <label className="relative block w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input className="pl-10" placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

export default SearchBar
