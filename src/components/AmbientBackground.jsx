import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function AmbientBackground() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Infinite blur/transform loops choke real phones and make scroll feel locked
    const isMobile = window.matchMedia('(max-width: 860px)').matches
    if (reduce || isMobile) return undefined

    const orbs = root.querySelectorAll('.amb-orb')
    const lines = root.querySelectorAll('.amb-line')
    const glow = root.querySelector('.amb-glow')

    const ctx = gsap.context(() => {
      gsap.to(orbs, {
        y: (i) => (i % 2 === 0 ? -40 : 50),
        x: (i) => (i % 2 === 0 ? 30 : -35),
        duration: (i) => 8 + i * 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.4,
      })

      gsap.to(lines, {
        backgroundPosition: '200% 0',
        duration: 14,
        repeat: -1,
        ease: 'none',
      })

      gsap.to(glow, {
        scale: 1.18,
        opacity: 0.55,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      const onMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 24
        const y = (e.clientY / window.innerHeight - 0.5) * 24
        gsap.to(root, { x: x * 0.35, y: y * 0.25, duration: 1.2, ease: 'power2.out' })
      }

      window.addEventListener('pointermove', onMove)
      return () => window.removeEventListener('pointermove', onMove)
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div className="amb" ref={rootRef} aria-hidden="true">
      <div className="amb-glow" />
      <div className="amb-orb amb-orb--a" />
      <div className="amb-orb amb-orb--b" />
      <div className="amb-orb amb-orb--c" />
      <div className="amb-grid">
        <span className="amb-line" />
        <span className="amb-line" />
        <span className="amb-line" />
        <span className="amb-line" />
      </div>
    </div>
  )
}
