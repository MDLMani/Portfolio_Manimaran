import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const MOBILE_MQ = '(max-width: 860px)'
const TRIGGER_ID = 'hax-mobile-panel-stages'

ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
})

/**
 * Mobile Scroll Panels with 60 FPS GSAP bounceback animations,
 * zero layout thrashing, and hardware-accelerated compositor scrolling.
 */
export function useMobileScrollPanels({
  theatreRef,
  heroRef,
  panelIds,
  setActivePanel,
  enabled = true,
  paused = false,
}) {
  const scrollToStageRef = useRef(() => {})

  const scrollToStage = useCallback((target) => {
    scrollToStageRef.current(target)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined

    const theatre = theatreRef?.current
    const hero = heroRef.current
    if (!theatre || !hero) return undefined

    const mq = window.matchMedia(MOBILE_MQ)
    let ctx = null
    let lastActive = null
    let touchCleanups = () => {}

    const clearPanelProps = () => {
      hero.querySelectorAll('.hax-panel').forEach((panel) => {
        gsap.set(panel, { clearProps: 'flexGrow,transform,scale' })
        const content = panel.querySelector('.hax-panel__content')
        if (content) gsap.set(content, { clearProps: 'opacity,visibility,transform,scale' })
      })
    }

    const teardownDesktop = () => {
      hero.classList.remove('hax-hero--scroll-driven')
      document.documentElement.classList.remove('hax-theatre-scroll')
      delete hero.dataset.scrollProgress
      clearPanelProps()
      touchCleanups()
      touchCleanups = () => {}
    }

    const syncActive = (progress, count) => {
      const steps = Math.max(count - 1, 1)
      const idx = Math.min(count - 1, Math.max(0, Math.round(progress * steps)))
      const next = panelIds[idx]
      if (next && next !== lastActive) {
        lastActive = next
        setActivePanel(next)
      }
    }

    const animateToStage = (target, stageCount) => {
      const st = ScrollTrigger.getById(TRIGGER_ID)
      if (!st) return
      const steps = Math.max(stageCount - 1, 1)
      let stageIndex = 0
      if (typeof target === 'number') {
        stageIndex = Math.max(0, Math.min(stageCount - 1, target))
      } else if (typeof target === 'string') {
        const found = panelIds.indexOf(target)
        if (found !== -1) stageIndex = found
      }
      const targetProgress = stageIndex / steps
      const targetY = st.start + (st.end - st.start) * targetProgress

      gsap.killTweensOf(window)
      gsap.to(window, {
        scrollTo: { y: targetY, autoKill: false },
        duration: 0.72,
        ease: 'back.out(1.6)', // Silky GSAP bounceback overshoot
        overwrite: 'auto',
        onUpdate: () => ScrollTrigger.update(),
      })
    }

    scrollToStageRef.current = (target) => {
      const ordered = panelIds
        .map((id) => hero.querySelector(`.hax-panel--${id}`))
        .filter(Boolean)
      animateToStage(target, ordered.length || panelIds.length)
    }

    const attachTouchInteractions = (ordered) => {
      touchCleanups()
      const cleanups = []

      // 1. Tactile touch squash & spring bounceback on panels for native Android feel
      ordered.forEach((panel) => {
        let pressed = false
        const onTouchStart = (e) => {
          if (e.target.closest?.('.hax-cta, a, button')) return
          pressed = true
          gsap.to(panel, {
            scale: 0.985,
            duration: 0.12,
            ease: 'power2.out',
            overwrite: 'auto',
          })
          if (window.navigator?.vibrate) {
            try {
              window.navigator.vibrate(8)
            } catch {
              /* ignore */
            }
          }
        }

        const onTouchEnd = () => {
          if (!pressed) return
          pressed = false
          gsap.to(panel, {
            scale: 1,
            duration: 0.45,
            ease: 'back.out(2.2)', // Tactile spring bounceback
            overwrite: 'auto',
          })
        }

        panel.addEventListener('touchstart', onTouchStart, { passive: true })
        panel.addEventListener('touchend', onTouchEnd, { passive: true })
        panel.addEventListener('touchcancel', onTouchEnd, { passive: true })

        cleanups.push(() => {
          panel.removeEventListener('touchstart', onTouchStart)
          panel.removeEventListener('touchend', onTouchEnd)
          panel.removeEventListener('touchcancel', onTouchEnd)
        })
      })

      // 2. Gesture swipe detection with GSAP bounceback to next/prev stage (non-blocking passive)
      let startY = 0
      let startX = 0
      let startTime = 0
      let isTracking = false

      const onHeroTouchStart = (e) => {
        if (e.touches.length !== 1) return
        if (e.target.closest?.('.hax-cta, a, button')) return
        isTracking = true
        startY = e.touches[0].clientY
        startX = e.touches[0].clientX
        startTime = Date.now()
      }

      const onHeroTouchEnd = (e) => {
        if (!isTracking || !e.changedTouches.length) return
        isTracking = false
        const endY = e.changedTouches[0].clientY
        const endX = e.changedTouches[0].clientX
        const dy = endY - startY
        const dx = endX - startX
        const dt = Date.now() - startTime

        // Fast flick/swipe vertically (more vertical than horizontal)
        if (dt < 320 && Math.abs(dy) > 42 && Math.abs(dy) > Math.abs(dx) * 1.2) {
          const st = ScrollTrigger.getById(TRIGGER_ID)
          if (!st) return
          const steps = Math.max(ordered.length - 1, 1)
          const currentStage = Math.round(st.progress * steps)

          if (dy < 0 && currentStage < steps) {
            // Swiped UP -> advance to next stage with bounceback
            animateToStage(currentStage + 1, ordered.length)
          } else if (dy > 0 && currentStage > 0) {
            // Swiped DOWN -> return to previous stage with bounceback
            animateToStage(currentStage - 1, ordered.length)
          }
        }
      }

      hero.addEventListener('touchstart', onHeroTouchStart, { passive: true })
      hero.addEventListener('touchend', onHeroTouchEnd, { passive: true })
      hero.addEventListener('touchcancel', onHeroTouchEnd, { passive: true })

      cleanups.push(() => {
        hero.removeEventListener('touchstart', onHeroTouchStart)
        hero.removeEventListener('touchend', onHeroTouchEnd)
        hero.removeEventListener('touchcancel', onHeroTouchEnd)
      })

      touchCleanups = () => {
        cleanups.forEach((fn) => fn())
      }
    }

    const setup = () => {
      if (ctx) {
        ctx.revert()
        ctx = null
      }
      const existing = ScrollTrigger.getById(TRIGGER_ID)
      if (existing) existing.kill(true)
      lastActive = null

      try {
        ScrollTrigger.normalizeScroll(false)
      } catch {
        /* ignore */
      }

      if (!mq.matches) {
        teardownDesktop()
        setActivePanel(null)
        return
      }

      const ordered = panelIds
        .map((id) => hero.querySelector(`.hax-panel--${id}`))
        .filter(Boolean)

      if (ordered.length < 2) return

      hero.classList.add('hax-hero--scroll-driven')
      document.documentElement.classList.add('hax-theatre-scroll')

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setActivePanel(panelIds[0] ?? null)
        ordered.forEach((panel, i) => {
          gsap.set(panel, { flexGrow: i === 0 ? 6.4 : 0.72 })
        })
        return
      }

      const collapsed = 0.72
      const expanded = 6.4
      const stageDur = 1
      const ease = 'power2.inOut'
      const contents = ordered.map((p) => p.querySelector('.hax-panel__content'))

      attachTouchInteractions(ordered)

      ctx = gsap.context(() => {
        gsap.set(ordered, {
          clearProps: 'position,inset,width,height,transform,opacity,visibility,zIndex',
        })
        gsap.set(ordered, { flexGrow: collapsed })
        gsap.set(ordered[0], { flexGrow: expanded })

        contents.forEach((content, i) => {
          if (!content) return
          gsap.set(content, {
            autoAlpha: i === 0 ? 1 : 0,
            y: i === 0 ? 0 : 28,
            scale: i === 0 ? 1 : 0.95,
          })
        })

        lastActive = panelIds[0]
        setActivePanel(panelIds[0])

        const tl = gsap.timeline({ paused: true, defaults: { ease, duration: stageDur } })
        const steps = Math.max(ordered.length - 1, 1)

        tl.addLabel(panelIds[0] || 'about', 0)
        tl.to({}, { duration: 0.35 })

        for (let i = 0; i < ordered.length - 1; i += 1) {
          const at = tl.duration()
          tl.addLabel(panelIds[i + 1] || `stage-${i + 1}`, at)
          tl.to(ordered[i], { flexGrow: collapsed, ease }, at)
          tl.to(ordered[i + 1], { flexGrow: expanded, ease }, at)

          if (contents[i]) {
            tl.to(
              contents[i],
              { autoAlpha: 0, y: -16, scale: 0.97, duration: 0.32, ease: 'power2.in' },
              at,
            )
          }
          if (contents[i + 1]) {
            tl.fromTo(
              contents[i + 1],
              { autoAlpha: 0, y: 30, scale: 0.94 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.58,
                ease: 'back.out(1.7)', // Signature GSAP bounceback entrance!
              },
              at + 0.18,
            )
          }
        }

        tl.to({}, { duration: 0.45 })

        const onProgress = (self) => {
          hero.dataset.scrollProgress = self.progress.toFixed(3)
          syncActive(self.progress, ordered.length)
        }

        ScrollTrigger.create({
          id: TRIGGER_ID,
          trigger: hero,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * steps * 1.05)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8, // 60 FPS smooth GSAP dampening: eliminates shutter on mobile scroll
          animation: tl,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: true,
          // Silky elastic bounceback snap to avoid resting mid-transition
          snap: {
            snapTo: (value) => Math.round(value * steps) / steps,
            duration: { min: 0.35, max: 0.75 },
            delay: 0.08,
            ease: 'back.out(1.8)', // Signature GSAP spring bounceback
            inertia: false,
          },
          onUpdate: onProgress,
          onRefresh: onProgress,
        })
      }, theatre)

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        const st = ScrollTrigger.getById(TRIGGER_ID)
        if (st) {
          st.animation?.progress(st.progress)
          syncActive(st.progress, ordered.length)
          hero.dataset.scrollProgress = st.progress.toFixed(3)
        }
      })
    }

    setup()

    const onChange = () => setup()
    const onRefreshAsk = () => {
      if (!mq.matches) return
      ScrollTrigger.refresh()
    }

    mq.addEventListener('change', onChange)
    window.addEventListener('orientationchange', onChange)
    window.addEventListener('load', onRefreshAsk)

    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(onRefreshAsk, 250)
    }
    window.addEventListener('resize', onResize)

    return () => {
      mq.removeEventListener('change', onChange)
      window.removeEventListener('orientationchange', onChange)
      window.removeEventListener('load', onRefreshAsk)
      window.removeEventListener('resize', onResize)
      window.clearTimeout(resizeTimer)
      touchCleanups()
      if (ctx) ctx.revert()
      const existing = ScrollTrigger.getById(TRIGGER_ID)
      if (existing) existing.kill(true)
      try {
        ScrollTrigger.normalizeScroll(false)
      } catch {
        /* ignore */
      }
      teardownDesktop()
    }
  }, [enabled, theatreRef, heroRef, panelIds, setActivePanel])

  useEffect(() => {
    const existing = ScrollTrigger.getById(TRIGGER_ID)
    if (!existing) return undefined
    if (paused) existing.disable(false)
    else {
      existing.enable(false)
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }
    return undefined
  }, [paused])

  return { scrollToStage }
}
