import { Outlet } from 'react-router-dom'
import Footer from '@/components/layout/Footer'
import PublicNavbar from '@/components/layout/PublicNavbar'

function PublicLayout() {
  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default PublicLayout
