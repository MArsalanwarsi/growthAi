import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function usePageReveal(trigger = 'default') {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out' },
      )
    }, ref)

    return () => ctx.revert()
  }, [trigger])

  return ref
}

export function useStaggerReveal(trigger = 'default') {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-animate="stagger"]',
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power3.out' },
      )
    }, ref)

    return () => ctx.revert()
  }, [trigger])

  return ref
}

export function useHeroMotion(trigger = 'default') {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero="panel"]',
        { autoAlpha: 0, y: 28, rotateX: 8 },
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
      )
      gsap.to('[data-hero="pulse"]', {
        scale: 1.04,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, ref)

    return () => ctx.revert()
  }, [trigger])

  return ref
}
