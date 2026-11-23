import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Eclipse Orbit — a miniature day/night celestial dial.
 * Not a switch: a rotating hemisphere orbit that flips the theme.
 */
export default function ThemeToggle({ resolved, onToggle }) {
  const rootRef = useRef(null)
  const orbitRef = useRef(null)
  const isLight = resolved === 'light'

  useEffect(() => {
    const orbit = orbitRef.current
    if (!orbit) return
    gsap.to(orbit, {
      rotate: isLight ? 0 : 180,
      duration: 0.85,
      ease: 'power3.inOut',
    })
  }, [isLight])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const ring = root.querySelector('.eclipse__ring')
    const tween = gsap.to(ring, {
      rotate: 360,
      duration: 18,
      repeat: -1,
      ease: 'none',
    })
    return () => tween.kill()
  }, [])

  return (
    <button
      ref={rootRef}
      type="button"
      className={`eclipse ${isLight ? 'is-day' : 'is-night'}`}
      onClick={(event) => onToggle(event)}
      aria-label={isLight ? 'Orbit to night theme' : 'Orbit to day theme'}
      title={isLight ? 'Orbit to night' : 'Orbit to day'}
    >
      <span className="eclipse__halo" aria-hidden="true" />
      <span className="eclipse__ring" aria-hidden="true" />
      <span className="eclipse__core" aria-hidden="true">
        <span className="eclipse__orbit" ref={orbitRef}>
          <span className="eclipse__sun" />
          <span className="eclipse__moon" />
        </span>
        <span className="eclipse__shadow" />
      </span>
      <span className="eclipse__caption" aria-hidden="true">
        {isLight ? 'DAY' : 'NIGHT'}
      </span>
    </button>
  )
}
