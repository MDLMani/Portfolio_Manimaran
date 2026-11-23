import { useEffect, useState } from 'react'

const MESSAGES = [
  'LOADING RESUME',
  'SYNCING FLUTTER SKILLS',
  'OPENING NODE APIS',
  'LOADING PROJECTS',
  'PREPARING PORTFOLIO',
]

export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [msgIdx, setMsgIdx] = useState(0)
  const [displayedMessage, setDisplayedMessage] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIdx((i) => (i + 1) % MESSAGES.length)
    }, 480)

    const start = performance.now()
    const duration = 2400
    let raf = 0

    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const next = Math.round((1 - (1 - p) ** 2) * 100)
      setPct(next)
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        clearInterval(msgTimer)
        setDone(true)
        setTimeout(() => onDone?.(), 700)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => {
      clearInterval(msgTimer)
      cancelAnimationFrame(raf)
    }
  }, [onDone])

  useEffect(() => {
    let characterIndex = 0
    let typingTimer

    const typeNextCharacter = () => {
      characterIndex += 1
      setDisplayedMessage(MESSAGES[msgIdx].slice(0, characterIndex))

      if (characterIndex >= MESSAGES[msgIdx].length) {
        return
      }

      typingTimer = setTimeout(typeNextCharacter, 28)
    }

    const startTimer = setTimeout(typeNextCharacter, 0)

    return () => {
      clearTimeout(startTimer)
      clearTimeout(typingTimer)
    }
  }, [msgIdx])

  if (done && pct >= 100) {
    // keep mounted briefly with done class for fade
  }

  return (
    <div className={`preloader ${done ? 'done' : ''}`} id="preloader" style={done ? { display: pct >= 100 ? undefined : undefined } : undefined}>
      <div className="core-glyph" aria-hidden="true">
        <span className="ring" />
        <span className="ring r2" />
        <span className="ring r3" />
        <span className="pearl" />
      </div>
      <div className="boot-msg" id="boot-msg" aria-live="polite">
        {displayedMessage}
        <span className="typing-cursor" aria-hidden="true" />
      </div>
      <div className="bar">
        <div className="num" id="boot-num">
          {pct}%
        </div>
        <div className="fill" id="boot-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
