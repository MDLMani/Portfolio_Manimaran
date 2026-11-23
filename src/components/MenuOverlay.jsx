import { MENU_LINKS } from '../data/portfolio'

export default function MenuOverlay({ open, onClose, onGoTo }) {
  return (
    <div className={`menu-overlay ${open ? '' : 'hidden'}`} id="menu-overlay">
      <button className="close" id="menu-close-btn" type="button" onClick={onClose}>
        Close
      </button>
      <div className="inner">
        <div className="menu-kicker">Resume Navigation // Manimaran</div>
        <nav id="menu-nav">
          {MENU_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => {
                onGoTo?.(link.at)
                onClose?.()
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
