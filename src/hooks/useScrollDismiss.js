import { useEffect } from 'react'

/**
 * Close an open sheet when the user scrolls/pulls upward past the top.
 */
export function useScrollDismiss(openId, onDismiss) {
  useEffect(() => {
    if (openId == null) return undefined

    const sheet = document.querySelector('.hax-project--open')
    if (!sheet) return undefined

    let pull = 0
    let touchStartY = 0
    let armed = false

    const reset = () => {
      pull = 0
      sheet.classList.remove('hax-project--pulling')
      sheet.style.removeProperty('--pull')
    }

    const maybeClose = (amount) => {
      pull += amount
      const progress = Math.min(pull / 90, 1)
      sheet.classList.add('hax-project--pulling')
      sheet.style.setProperty('--pull', String(progress))
      if (pull >= 90) {
        reset()
        onDismiss()
      }
    }

    const onWheel = (e) => {
      if (sheet.scrollTop > 2) {
        reset()
        return
      }
      if (e.deltaY < 0) {
        e.preventDefault()
        maybeClose(Math.abs(e.deltaY) * 0.65)
      } else {
        reset()
      }
    }

    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
      armed = sheet.scrollTop <= 2
    }

    const onTouchMove = (e) => {
      if (!armed || sheet.scrollTop > 2) {
        reset()
        return
      }
      const dy = e.touches[0].clientY - touchStartY
      // Finger moves down = content wants to scroll up past top → dismiss gesture
      if (dy > 0) {
        maybeClose(dy * 0.35)
      } else {
        reset()
      }
    }

    const onTouchEnd = () => {
      if (pull < 90) reset()
      armed = false
    }

    sheet.addEventListener('wheel', onWheel, { passive: false })
    sheet.addEventListener('touchstart', onTouchStart, { passive: true })
    sheet.addEventListener('touchmove', onTouchMove, { passive: true })
    sheet.addEventListener('touchend', onTouchEnd)

    return () => {
      sheet.removeEventListener('wheel', onWheel)
      sheet.removeEventListener('touchstart', onTouchStart)
      sheet.removeEventListener('touchmove', onTouchMove)
      sheet.removeEventListener('touchend', onTouchEnd)
      reset()
    }
  }, [openId, onDismiss])
}
