import { Outlet } from 'react-router-dom'
import PageReveal from '@/components/animations/PageReveal'
import DashboardSidebar from '@/components/layout/DashboardSidebar'
import DashboardTopbar from '@/components/layout/DashboardTopbar'

function DashboardLayout() {
  return (
    <div className="min-h-screen">
      <DashboardSidebar />
      <DashboardTopbar />
      <main className="lg:ml-72">
        <PageReveal className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </PageReveal>
      </main>
    </div>
  )
}

export default DashboardLayout
