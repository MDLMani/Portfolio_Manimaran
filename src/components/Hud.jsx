import { CHAPTERS, profile } from '../data/portfolio'

export default function Hud({
  chapterIndex = 0,
  depth = '0000',
  core = 'READY',
  progress = 0,
  onOpenMenu,
  onGoTo,
}) {
  const chapter = CHAPTERS[chapterIndex] || CHAPTERS[0]

  return (
    <div className="hud">
      <div className="hud-tilt" id="hud-tilt">
        <div className="logo" id="logo-home" onClick={() => onGoTo?.(0)} role="button" tabIndex={0}>
          <h1>{profile.name.toUpperCase()}</h1>
          <span>{profile.title.toUpperCase()}</span>
        </div>

        <button className="menu-btn" id="menu-open-btn" type="button" onClick={onOpenMenu}>
          Menu
        </button>

        <div className="mobile-chapter" aria-live="polite">
          <strong>
            {chapter.num} / 10
          </strong>
          <span>{chapter.label}</span>
        </div>

        <div className="hud-label tl2">
          SCROLL:
          <em id="depth-val">{depth}</em>
        </div>
        <div className="hud-label tr2">
          ROLE:
          <em>DEVELOPER</em>
          <br />
          STATUS:
          <em id="core-val">{core}</em>
        </div>
        <div className="hud-label bl">
          STACK:
          <em>FLUTTER · NODE</em>
        </div>
        <div className="hud-label br">
          LOC:
          <em>{profile.location.toUpperCase()}</em>
        </div>

        <div className="vertical-label">RESUME PORTFOLIO</div>

        <div className="rail-left">
          <div className="rail-chapter" id="rail-chapter">
            SEC. {chapter.num} / 10
          </div>
          <div className="rail-title" id="rail-title">
            {chapter.title}
          </div>
          <ul id="rail-list">
            {CHAPTERS.map((c, i) => (
              <li key={c.num}>
                <button
                  type="button"
                  className={i === chapterIndex ? 'active' : ''}
                  onClick={() => onGoTo?.(c.at)}
                >
                  {c.num} {c.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="progress-rail" aria-hidden="true">
          <div className="progress-fill" id="progress-fill" style={{ height: `${progress * 100}%` }} />
          <div className="progress-dot" id="progress-dot" style={{ top: `${progress * 100}%` }} />
          <div className="progress-pct" id="progress-pct">
            {String(Math.round(progress * 100)).padStart(3, '0')}%
          </div>
        </div>
      </div>

      <div className={`scroll-hint ${progress > 0.02 ? 'hidden' : ''}`} id="scroll-hint">
        Scroll through resume
      </div>
    </div>
  )
}
