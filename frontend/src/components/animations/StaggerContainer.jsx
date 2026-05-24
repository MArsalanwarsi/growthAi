import { useLocation } from 'react-router-dom'
import { useStaggerReveal } from '@/hooks/useGSAPAnimations'

function StaggerContainer({ children, className = '' }) {
  const location = useLocation()
  const ref = useStaggerReveal(location.pathname)

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export default StaggerContainer
