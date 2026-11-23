import { useCallback, useEffect, useState } from 'react'
import gsap from 'gsap'

const STORAGE_KEY = 'portfolio-theme'

function readStored() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function writeStored(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* ignore */
  }
}

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme
  const meta = document.querySelector('meta[name="color-scheme"]')
  if (meta) meta.content = theme
}

function originFromEvent(event) {
  const target = event?.currentTarget instanceof Element ? event.currentTarget : document.querySelector('.eclipse')
  if (target) {
    const rect = target.getBoundingClientRect()
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
  }
  if (event?.clientX != null && event?.clientY != null) {
    return { x: event.clientX, y: event.clientY }
  }
  return { x: window.innerWidth - 40, y: 40 }
}

function maxRadius(x, y) {
  const distances = [
    Math.hypot(x, y),
    Math.hypot(window.innerWidth - x, y),
    Math.hypot(x, window.innerHeight - y),
    Math.hypot(window.innerWidth - x, window.innerHeight - y),
  ]
  return Math.ceil(Math.max(...distances))
}

function commitTheme(next, setTheme) {
  setTheme(next)
  writeStored(next)
  applyTheme(next)
}

function beginThemeSwitch() {
  document.documentElement.classList.add('theme-switching')
}

function endThemeSwitch() {
  document.documentElement.classList.remove('theme-switching')
}

/**
 * Soft multi-ring wave fallback when View Transitions are unavailable.
 * Does not paint a solid full-screen veil over the UI.
 */
function runWaveFallback(next, x, y) {
  const radius = maxRadius(x, y)
  const layer = document.createElement('div')
  layer.className = 'theme-wave'
  layer.dataset.mode = next
  layer.style.setProperty('--tx', `${x}px`)
  layer.style.setProperty('--ty', `${y}px`)
  document.body.appendChild(layer)

  const rings = [0, 1, 2].map((i) => {
    const ring = document.createElement('span')
    ring.className = 'theme-wave__ring'
    ring.style.setProperty('--i', String(i))
    layer.appendChild(ring)
    return ring
  })

  const wash = document.createElement('span')
  wash.className = 'theme-wave__wash'
  layer.appendChild(wash)

  gsap.set(wash, {
    clipPath: `circle(0px at ${x}px ${y}px)`,
    opacity: 0.28,
  })

  gsap.set(rings, {
    scale: 0.15,
    opacity: 0.55,
    transformOrigin: '50% 50%',
  })

  const tl = gsap.timeline({
    onComplete: () => layer.remove(),
  })

  tl.to(
    wash,
    {
      clipPath: `circle(${radius}px at ${x}px ${y}px)`,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.out',
    },
    0,
  )

  rings.forEach((ring, i) => {
    tl.to(
      ring,
      {
        scale: 1 + i * 0.22,
        opacity: 0,
        duration: 0.7 + i * 0.12,
        ease: 'power2.out',
      },
      i * 0.05,
    )
  })
}

export function useTheme() {
  const [theme, setTheme] = useState(() => readStored() ?? systemTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY) return
      if (e.newValue === 'light' || e.newValue === 'dark') setTheme(e.newValue)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggleTheme = useCallback(
    (event) => {
      const next = theme === 'light' ? 'dark' : 'light'
      const { x, y } = originFromEvent(event)
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduceMotion) {
        commitTheme(next, setTheme)
        return next
      }

      const root = document.documentElement
      root.style.setProperty('--theme-x', `${x}px`)
      root.style.setProperty('--theme-y', `${y}px`)
      root.style.setProperty('--theme-r', `${maxRadius(x, y)}px`)
      beginThemeSwitch()

      // Preferred: circular wave reveal from the clicked eclipse button.
      if (typeof document.startViewTransition === 'function') {
        const transition = document.startViewTransition(() => {
          commitTheme(next, setTheme)
        })
        transition.finished.catch(() => {}).finally(() => {
          endThemeSwitch()
          root.style.removeProperty('--theme-x')
          root.style.removeProperty('--theme-y')
          root.style.removeProperty('--theme-r')
        })
        return next
      }

      // Fallback browsers: apply theme, then soft radial wave from the button.
      commitTheme(next, setTheme)
      runWaveFallback(next, x, y)
      window.setTimeout(endThemeSwitch, 900)
      return next
    },
    [theme],
  )

  return { theme, resolved: theme, toggleTheme }
}
