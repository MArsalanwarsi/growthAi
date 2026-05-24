import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { formatNumber } from '@/utils/formatters'

function AnimatedCounter({ value, suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const counter = { value: 0 }
    const tween = gsap.to(counter, {
      value,
      duration: 1,
      ease: 'power3.out',
      onUpdate: () => setDisplayValue(Math.round(counter.value)),
    })

    return () => tween.kill()
  }, [value])

  return (
    <span>
      {formatNumber(displayValue)}
      {suffix}
    </span>
  )
}

export default AnimatedCounter
