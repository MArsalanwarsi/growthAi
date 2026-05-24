import { Skeleton } from '@/components/ui/skeleton'

function DashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <Skeleton key={item} className="h-32" />
      ))}
    </div>
  )
}

export default DashboardSkeleton
