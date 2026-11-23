import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { CHAPTERS, MASTER_DURATION, PROJECTS } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

function scrambleIn(rootSel) {
  return () => {
    const root = document.querySelector(rootSel)
    if (!root) return
    root.querySelectorAll('[data-scramble]').forEach((el) => {
      const original = el.dataset.original || el.textContent
      el.dataset.original = original
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>-_'
      let frame = 0
      const total = 14
      const id = setInterval(() => {
        frame += 1
        el.textContent = original
          .split('')
          .map((ch, i) => {
            if (ch === '\n' || ch === ' ') return ch
            if (i < (frame / total) * original.length) return original[i]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
        if (frame >= total) {
          clearInterval(id)
          el.textContent = original
        }
      }, 30)
    })
  }
}

export function useCinematicScroll({
  enabled,
  onProgress,
  onChapter,
  onProjectIndex,
}) {
  const goToRef = useRef(() => {})

  useEffect(() => {
    if (!enabled) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lenis = null
    let rafId = 0
    const cleanups = []

    if (!reducedMotion) {
      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        touchMultiplier: 1.4,
      })
      lenis.on('scroll', ScrollTrigger.update)
      const raf = (time) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
      cleanups.push(() => {
        cancelAnimationFrame(rafId)
        lenis.destroy()
      })
    } else {
      document.documentElement.style.overflowY = 'auto'
      window.addEventListener('scroll', ScrollTrigger.update, { passive: true })
      cleanups.push(() => window.removeEventListener('scroll', ScrollTrigger.update))
    }

    const goTo = (fraction) => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo({ top: fraction * max, behavior: reducedMotion ? 'auto' : 'smooth' })
    }
    goToRef.current = goTo

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.scroll-space',
        start: 'top top',
        end: 'bottom bottom',
        scrub: reducedMotion ? true : 1.1,
        onUpdate: (self) => {
          const p = self.progress
          onProgress?.(p)

          let idx = 0
          for (let i = 0; i < CHAPTERS.length; i += 1) {
            if (p >= CHAPTERS[i].at - 0.01) idx = i
          }
          onChapter?.(idx)

          const selectStart = 94 / MASTER_DURATION
          const selectEnd = 124 / MASTER_DURATION
          if (p >= selectStart && p <= selectEnd) {
            const local = Math.max(0, Math.min(0.999, (p - selectStart) / (selectEnd - selectStart)))
            const charIndex = Math.min(PROJECTS.length - 1, Math.floor(local * PROJECTS.length))
            onProjectIndex?.(charIndex)
          }
        },
      },
    })

    const show = (sel, inAt, outAt) => {
      if (inAt === 0) gsap.set(sel, { autoAlpha: 1 })
      else tl.fromTo(sel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4 }, inAt)
      if (outAt != null) tl.to(sel, { autoAlpha: 0, duration: 1.4 }, outAt - 1.4)
    }

    gsap.set('.scene', { autoAlpha: 0 })
    gsap.set('#hero-gate', { autoAlpha: 1 })

    // Hero gate fades as surface begins
    tl.fromTo('#hero-gate', { autoAlpha: 1 }, { autoAlpha: 0, duration: 4 }, 8)

    show('.sc-surface', 0, 24)
    if (!reducedMotion) {
      tl.fromTo('.sc-surface .cam', { scale: 1, y: '0%' }, { scale: 1.08, y: '-2%', duration: 24 }, 0)
      tl.set('.sc-surface .copy', { autoAlpha: 0 }, 0)
      tl.fromTo('.sc-surface .copy', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 4 }, 4)
    }

    show('.sc-kael', 24, 60)
    tl.call(scrambleIn('.sc-kael'), null, 30)
    if (!reducedMotion) {
      tl.fromTo('.sc-kael .cam', { scale: 1.06 }, { scale: 1.24, duration: 36 }, 24)
      tl.fromTo('.kael-figure', { yPercent: 10, scale: 0.96, opacity: 0.1 }, { yPercent: 0, scale: 1, opacity: 1, duration: 12 }, 30)
      tl.fromTo('.sc-kael .copy', { y: 60, filter: 'blur(8px)', opacity: 0 }, { y: 0, filter: 'blur(0px)', opacity: 1, duration: 5 }, 30)
    }

    show('.sc-core', 60, 72)
    tl.call(scrambleIn('.sc-core'), null, 61)
    if (!reducedMotion) {
      tl.fromTo('.sc-core .cam', { scale: 1.28 }, { scale: 1, duration: 12 }, 60)
      tl.fromTo('.core-orb', { scale: 0.4, autoAlpha: 0 }, { scale: 1.15, autoAlpha: 1, duration: 6 }, 60.5)
      gsap.utils.toArray('.core-rings span').forEach((ring, i) => {
        tl.fromTo(ring, { scale: 0.15, opacity: 0.9 }, { scale: 3.4, opacity: 0, duration: 5 }, 60 + i * 2.6)
      })
      tl.fromTo('.sc-core .copy', { y: 50, filter: 'blur(8px)' }, { y: 0, filter: 'blur(0px)', duration: 3.5 }, 61)
    }

    show('.sc-nerissa', 72, 94)
    tl.call(scrambleIn('.sc-nerissa'), null, 74)
    if (!reducedMotion) {
      tl.fromTo('.pearl-gate.left', { xPercent: 0 }, { xPercent: -105, duration: 4.5 }, 72)
      tl.fromTo('.pearl-gate.right', { xPercent: 0 }, { xPercent: 105, duration: 4.5 }, 72)
      tl.fromTo('.sc-nerissa .cam', { scale: 1.16 }, { scale: 1, duration: 22 }, 72)
      tl.fromTo('.nerissa-figure', { xPercent: -10, autoAlpha: 0, filter: 'blur(6px)' }, { xPercent: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 5 }, 77)
      tl.fromTo('.sc-nerissa .copy', { y: 50, filter: 'blur(8px)' }, { y: 0, filter: 'blur(0px)', duration: 3.5 }, 74)
    }

    show('#scene-select', 94, 124)
    if (!reducedMotion) {
      tl.fromTo('.select-head', { y: 24, autoAlpha: 0, filter: 'blur(8px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 3 }, 94.2)
      tl.fromTo('.select-layout', { y: 60, scale: 0.96, filter: 'blur(8px)' }, { y: 0, scale: 1, filter: 'blur(0px)', duration: 4 }, 94.5)
      tl.fromTo('.char-tabs', { xPercent: -18 }, { xPercent: -82, duration: 30 }, 94)
      tl.fromTo('.ghost-name', { xPercent: 8, opacity: 0.08 }, { xPercent: -8, opacity: 0.18, duration: 30 }, 94)
      tl.fromTo('.portrait-panel', { xPercent: -6 }, { xPercent: 6, duration: 30 }, 94)
      tl.fromTo('.guardian-scroll-hint', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 2 }, 95)
      tl.to('.guardian-scroll-hint', { autoAlpha: 0, duration: 2 }, 121)
    }

    show('.sc-vaelor', 124, 140)
    tl.call(scrambleIn('.sc-vaelor'), null, 126)
    if (!reducedMotion) {
      tl.fromTo('.sc-vaelor .cam', { scale: 1.02 }, { scale: 1.3, duration: 10 }, 124)
      tl.fromTo('.red-shift', { opacity: 0 }, { opacity: 1, duration: 4 }, 125)
      tl.fromTo('.sc-vaelor .copy', { y: 50, filter: 'blur(8px)' }, { y: 0, filter: 'blur(0px)', duration: 3.5 }, 126)
      gsap.utils.toArray('.pressure-rings span').forEach((ring, i) => {
        tl.fromTo(ring, { scale: 0.2, opacity: 0.8 }, { scale: 3, opacity: 0, duration: 4.5 }, 128 + i * 2.5)
      })
    }

    show('.sc-morvella', 140, 154)
    tl.call(scrambleIn('.sc-morvella'), null, 142)
    if (!reducedMotion) {
      tl.fromTo('.sc-morvella .cam', { scale: 1.2 }, { scale: 1.02, duration: 8 }, 140)
      tl.fromTo('.ink-cloud.a', { scale: 0.4, opacity: 0 }, { scale: 1.25, opacity: 1, duration: 6 }, 140)
      tl.fromTo('.ink-cloud.b', { scale: 0.4, opacity: 0 }, { scale: 1.3, opacity: 1, duration: 6 }, 143)
      tl.fromTo('.sc-morvella .copy', { y: 50, filter: 'blur(8px)' }, { y: 0, filter: 'blur(0px)', duration: 3.5 }, 142)
    }

    show('.sc-worlds', 154, 170)
    if (!reducedMotion) {
      tl.fromTo('.zones-track', { xPercent: 0 }, { xPercent: -80, duration: 14 }, 155)
      tl.fromTo('.worlds-head', { y: 30, filter: 'blur(6px)' }, { y: 0, filter: 'blur(0px)', duration: 2 }, 154.5)
    }

    show('.sc-battle', 170, 188)
    tl.call(scrambleIn('.sc-battle'), null, 183)
    if (!reducedMotion) {
      tl.fromTo('.sc-battle .cam', { scale: 1.26 }, { scale: 1, duration: 18 }, 170)
      tl.fromTo('.systems-grid', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 4 }, 172)
      tl.fromTo('.sc-battle .copy', { y: 54, autoAlpha: 0, filter: 'blur(10px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 3.2 }, 181.5)
      tl.fromTo('.flash', { opacity: 0 }, { opacity: 0.35, duration: 0.8 }, 184.4)
      tl.to('.flash', { opacity: 0, duration: 1.2 }, 185.2)
    }

    show('.sc-cta', 188, null)
    tl.call(scrambleIn('.sc-cta'), null, 189)
    if (!reducedMotion) {
      tl.fromTo('.sc-cta .copy', { y: 60, filter: 'blur(12px)', autoAlpha: 0 }, { y: 0, filter: 'blur(0px)', autoAlpha: 1, duration: 3 }, 189)
    }

    // Hero gate intro micro-motion
    if (!reducedMotion) {
      gsap.fromTo('#hero-gate-copy', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2, delay: 0.2 })
      gsap.fromTo('#hero-gate-cards', { x: 40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1, delay: 0.5 })
      gsap.fromTo('.profile-portal img', { scale: 1.08, filter: 'blur(8px)' }, { scale: 1, filter: 'blur(0px)', duration: 1.6, delay: 0.1 })
      gsap.fromTo('#hero-gate-shutter-left', { xPercent: 0 }, { xPercent: -102, duration: 1.4, delay: 0.15, ease: 'power2.inOut' })
      gsap.fromTo('#hero-gate-shutter-right', { xPercent: 0 }, { xPercent: 102, duration: 1.4, delay: 0.15, ease: 'power2.inOut' })
    }

    if (!reducedMotion) {
      const tiltX = gsap.quickTo('#hud-tilt', 'x', { duration: 0.7, ease: 'power3' })
      const tiltY = gsap.quickTo('#hud-tilt', 'y', { duration: 0.7, ease: 'power3' })
      const onMove = (e) => {
        tiltX((e.clientX / window.innerWidth - 0.5) * 12)
        tiltY((e.clientY / window.innerHeight - 0.5) * 8)
      }
      window.addEventListener('mousemove', onMove)
      cleanups.push(() => window.removeEventListener('mousemove', onMove))
    }

    ScrollTrigger.refresh()
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    cleanups.push(() => window.removeEventListener('resize', onResize))

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      cleanups.forEach((fn) => fn())
    }
  }, [enabled, onProgress, onChapter, onProjectIndex])

  return {
    goTo: (fraction) => goToRef.current(fraction),
  }
}
