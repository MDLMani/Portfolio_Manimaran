import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AmbientBackground from './components/AmbientBackground'
import StorySections from './components/StorySections'
import ThemeToggle from './components/ThemeToggle'
import { ABOUT, education, experience, PANELS, profile, PROJECTS, QA, skills } from './data/portfolio'
import { useMobileScrollPanels } from './hooks/useMobileScrollPanels'
import { useScrollDismiss } from './hooks/useScrollDismiss'
import { useTheme } from './hooks/useTheme'

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h3l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 5 5a2 2 0 0 1 2-2z" />
    </svg>
  )
}

function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        stroke="none"
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8a9.56 9.56 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2z"
      />
    </svg>
  )
}

function IconPlus() {
  return <span aria-hidden="true">+</span>
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function DismissHint() {
  return (
    <div className="hax-project__dismiss" aria-hidden="true">
      <span className="hax-project__dismiss-bar" />
      <strong>Scroll up to return</strong>
    </div>
  )
}

export default function App() {
  const theatreRef = useRef(null)
  const heroRef = useRef(null)
  const [activePanel, setActivePanel] = useState(null)
  const [openProject, setOpenProject] = useState(null)
  const [mobileScrollMode, setMobileScrollMode] = useState(false)
  const { resolved, toggleTheme } = useTheme()
  const panelIds = useMemo(() => PANELS.map((panel) => panel.id), [])

  const closeSheet = useCallback(() => setOpenProject(null), [])

  useScrollDismiss(openProject, closeSheet)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)')
    const sync = () => setMobileScrollMode(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const { scrollToStage } = useMobileScrollPanels({
    theatreRef,
    heroRef,
    panelIds,
    setActivePanel,
    enabled: true,
    paused: openProject != null,
  }) || {}

  useEffect(() => {
    const locked = openProject != null
    document.documentElement.classList.toggle('hax-locked', locked)
    document.body.classList.toggle('hax-locked', locked)
    return () => {
      document.documentElement.classList.remove('hax-locked')
      document.body.classList.remove('hax-locked')
    }
  }, [openProject])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (openProject != null) {
        closeSheet()
        return
      }
      if (!mobileScrollMode) setActivePanel(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openProject, closeSheet, mobileScrollMode])

  const expandPanel = (id) => setActivePanel(id)
  const collapsePanel = () => setActivePanel(null)
  const openSheet = (id) => setOpenProject(id)

  return (
    <div className="hax-page">
      <AmbientBackground />

      <div className="hax-contact" aria-label="Contact and theme">
        <ThemeToggle resolved={resolved} onToggle={toggleTheme} />
        <a href={`mailto:${profile.email}`} aria-label="Email">
          <IconMail />
        </a>
        <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} aria-label="Phone">
          <IconPhone />
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <IconGithub />
        </a>
      </div>

      <div
        ref={theatreRef}
        className={mobileScrollMode ? 'hax-theatre hax-theatre--active' : 'hax-theatre hax-theatre--desktop'}
      >
      <section
        ref={heroRef}
        className={`hax-hero ${activePanel ? 'hax-hero--open' : ''} ${mobileScrollMode ? 'hax-hero--scroll-driven' : ''} ${mobileScrollMode && activePanel === 'qa' ? 'is-last-stage' : ''}`}
        aria-label="Manimaran portfolio hero"
      >
        <div className="hax-eyebrow">
          <div className="hax-brand">
            <img src={profile.photo} alt={profile.name} width={48} height={48} fetchPriority="high" />
            <div className="hax-brand__text">
              <strong>{profile.name}</strong>
              <span>{profile.title}</span>
            </div>
          </div>
        </div>

        {mobileScrollMode && (
          <div className="hax-scroll-cue" aria-hidden="true">
            <span />
            Scroll to explore
          </div>
        )}

        {mobileScrollMode && (
          <div className="hax-stage-dots" aria-label="Stages" role="tablist">
            {PANELS.map((panel) => (
              <button
                type="button"
                key={panel.id}
                className={`hax-stage-dot ${activePanel === panel.id ? 'is-active' : ''}`}
                aria-label={`Jump to ${panel.rail} stage`}
                role="tab"
                aria-selected={activePanel === panel.id}
                onClick={() => scrollToStage?.(panel.id)}
              />
            ))}
          </div>
        )}

        {PANELS.map((panel) => {
          const isActive = activePanel === panel.id
          return (
            <article
              key={panel.id}
              className={`hax-panel hax-panel--${panel.tone} ${isActive ? 'hax-panel--active' : ''}`}
              role={mobileScrollMode ? 'button' : 'button'}
              tabIndex={0}
              aria-label={`${panel.rail} panel`}
              aria-expanded={isActive}
              onClick={() => {
                if (mobileScrollMode) {
                  if (!isActive) scrollToStage?.(panel.id)
                  return
                }
                if (isActive) collapsePanel()
                else expandPanel(panel.id)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  if (mobileScrollMode) {
                    if (!isActive) scrollToStage?.(panel.id)
                    return
                  }
                  if (isActive) collapsePanel()
                  else expandPanel(panel.id)
                }
              }}
            >
              <div className="hax-panel__media" aria-hidden="true" />
              <div className="hax-panel__shade" aria-hidden="true" />

              <div className="hax-panel__rail" aria-hidden="true">
                <div className="hax-panel__line" />
                <div className="hax-panel__title">{panel.rail}</div>
                <div className="hax-panel__plus">
                  <IconPlus />
                </div>
              </div>

              <div className="hax-panel__num">{panel.number}</div>

              <div className="hax-panel__content" onClick={(e) => e.stopPropagation()}>
                {panel.id === 'about' && (
                  <div className="hax-panel__avatar">
                    <img src={profile.photo} alt={profile.name} loading="lazy" />
                  </div>
                )}
                <p className="hax-panel__csub">{panel.subtitle}</p>
                <h2 className="hax-panel__ctitle">{panel.title}</h2>
                <p className="hax-panel__text">{panel.text}</p>

                {panel.bullets && (
                  <ul className="hax-panel__bullets">
                    {panel.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                <ul className="hax-panel__meta">
                  {panel.meta.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <button type="button" className="hax-cta" onClick={() => openSheet(panel.sheet)}>
                  {panel.cta}
                  <IconArrow />
                </button>
              </div>

              {!mobileScrollMode && (
                <button
                  type="button"
                  className="hax-panel__close"
                  aria-label={`Close ${panel.title}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    collapsePanel()
                  }}
                >
                  <IconClose />
                </button>
              )}
            </article>
          )
        })}
      </section>
      </div>

      <StorySections
        onOpenAbout={() => openSheet('about')}
        onOpenQa={() => openSheet('qa')}
        onOpenProject={(index) => openSheet(index)}
      />

      <div className="hax-projects" aria-live="polite">
        <section
          className={`hax-project ${openProject === 'about' ? 'hax-project--open' : ''}`}
          aria-hidden={openProject !== 'about'}
        >
          <div className="hax-project__inner">
            <DismissHint />
            <div className="hax-project__label">ABOUT</div>
            <h2 className="hax-project__title">{ABOUT.title}</h2>
            <p className="hax-project__intro">{ABOUT.lead}</p>
            <div className="hax-project__hero hax-project__hero--image">
              <img src={ABOUT.image} alt="Delivery and driver product atmosphere" />
            </div>
            <div className="hax-project__cols">
              <div className="hax-project__col-text">
                {ABOUT.paragraphs.map((p) => (
                  <p className="hax-project__desc" key={p}>
                    {p}
                  </p>
                ))}
                <div className="hax-sheet-actions">
                  <a className="hax-cta" href={`mailto:${profile.email}`}>
                    Email Me
                    <IconArrow />
                  </a>
                  <a className="hax-cta" href="#qa" onClick={closeSheet}>
                    Jump to Q / A
                    <IconArrow />
                  </a>
                </div>
              </div>
              <div className="hax-project__col-info">
                <ul className="hax-project__info">
                  {ABOUT.highlights.map((item) => (
                    <li key={item.label}>
                      {item.label} — {item.value}
                    </li>
                  ))}
                  <li>
                    Languages — {skills.spoken.map((s) => `${s.name} (${s.level})`).join(' · ')}
                  </li>
                  <li>
                    Education — {education.degree}, {education.school} ({education.year})
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`hax-project ${openProject === 'qa' ? 'hax-project--open' : ''}`}
          aria-hidden={openProject !== 'qa'}
        >
          <div className="hax-project__inner">
            <DismissHint />
            <div className="hax-project__label">Q / A TESTING</div>
            <h2 className="hax-project__title">{QA.title}</h2>
            <p className="hax-project__intro">{QA.lead}</p>
            <div className="hax-project__hero hax-project__hero--image">
              <img src={QA.image} alt="Quality assurance product testing atmosphere" />
            </div>
            <div className="hax-project__cols">
              <div className="hax-project__col-text">
                <h3 className="sheet-subtitle">{QA.doneTitle}</h3>
                <ul className="hax-panel__bullets sheet-list">
                  {QA.done.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h3 className="sheet-subtitle">{QA.knowTitle}</h3>
                <ul className="hax-panel__bullets sheet-list">
                  {QA.know.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="hax-sheet-actions">
                  <a className="hax-cta" href={`mailto:${profile.email}`}>
                    Email Me
                    <IconArrow />
                  </a>
                </div>
              </div>
              <div className="hax-project__col-info">
                <ul className="hax-project__info">
                  {QA.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`hax-project ${openProject === 'experience' ? 'hax-project--open' : ''}`}
          aria-hidden={openProject !== 'experience'}
        >
          <div className="hax-project__inner">
            <DismissHint />
            <div className="hax-project__label">EXPERIENCE</div>
            <h2 className="hax-project__title">{experience.role}</h2>
            <p className="hax-project__intro">
              {experience.company} · {experience.period}
            </p>
            <div className="hax-project__stack">
              {[...skills.frontend.slice(0, 3), ...skills.backend, ...skills.database].map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="hax-project__hero hax-project__hero--image">
              <img src="/images/bg-tracker.jpg" alt="Enterprise work tracking atmosphere" />
            </div>
            <div className="hax-project__cols">
              <div className="hax-project__col-text">
                <ul className="hax-panel__bullets sheet-list">
                  {experience.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="hax-sheet-actions">
                  <a className="hax-cta" href={`mailto:${profile.email}`}>
                    Email Me
                    <IconArrow />
                  </a>
                  <a className="hax-cta" href={profile.naukri} target="_blank" rel="noopener noreferrer">
                    Naukri
                    <IconArrow />
                  </a>
                </div>
              </div>
              <div className="hax-project__col-info">
                <ul className="hax-project__info">
                  <li>Role — {experience.role}</li>
                  <li>Company — {experience.company}</li>
                  <li>Period — {experience.period}</li>
                  <li>
                    Education — {education.degree}, {education.school} ({education.year})
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {PROJECTS.map((project, index) => (
          <section
            key={project.id}
            className={`hax-project ${openProject === index ? 'hax-project--open' : ''}`}
            aria-hidden={openProject !== index}
          >
            <div className="hax-project__inner">
              <DismissHint />
              <div className="hax-project__label">PROJECT 0{index + 1}</div>
              <h2 className="hax-project__title">{project.name}</h2>
              <p className="hax-project__intro">{project.short}</p>
              <div className="hax-project__stack">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="hax-project__hero hax-project__hero--image">
                <img src={project.image} alt="" />
              </div>
              <div className="hax-project__cols">
                <div className="hax-project__col-text">
                  <p className="hax-project__desc">{project.details}</p>
                  <div className="hax-sheet-actions">
                    <button type="button" className="hax-cta" onClick={() => openSheet((index + 1) % PROJECTS.length)}>
                      Next project
                      <IconArrow />
                    </button>
                    <a className="hax-cta" href={`mailto:${profile.email}`}>
                      Email Me
                      <IconArrow />
                    </a>
                  </div>
                </div>
                <div className="hax-project__col-info">
                  <ul className="hax-project__info">
                    {project.meta.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                    <li>Location — {profile.location}</li>
                    <li>GitHub — github.com/MDLMani</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
