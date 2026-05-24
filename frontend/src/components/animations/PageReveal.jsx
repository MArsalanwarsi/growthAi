import { useLocation } from 'react-router-dom'
import { usePageReveal } from '@/hooks/useGSAPAnimations'

function PageReveal({ children, className = '' }) {
  const location = useLocation()
  const ref = usePageReveal(location.pathname)

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export default PageReveal
