import CodeBackground from './CodeBackground'
import { education, experience, profile, PROJECTS, skills, ZONES } from '../data/portfolio'

const LANGUAGE_LABELS = {
  dart: 'Dart',
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  sql: 'SQL',
}

function LanguageIcon({ language }) {
  const label = LANGUAGE_LABELS[language] || language

  if (language === 'dart') {
    return (
      <svg className="language-icon language-icon--dart" viewBox="0 0 40 40" role="img" aria-label={`${label} icon`}>
        <path d="M20 3 36 20 20 37 4 20 20 3Z" />
        <path d="m20 9 10 11-10 11L10 20 20 9Z" />
      </svg>
    )
  }

  if (language === 'sql') {
    return (
      <svg className="language-icon language-icon--sql" viewBox="0 0 40 40" role="img" aria-label={`${label} icon`}>
        <ellipse cx="20" cy="10" rx="11" ry="5" />
        <path d="M9 10v20c0 3 5 5 11 5s11-2 11-5V10" />
        <path d="M9 20c0 3 5 5 11 5s11-2 11-5" />
      </svg>
    )
  }

  return (
    <svg className={`language-icon language-icon--${language}`} viewBox="0 0 40 40" role="img" aria-label={`${label} icon`}>
      <rect x="3" y="3" width="34" height="34" rx="3" />
      <text x="20" y="26" textAnchor="middle">{language === 'typescript' ? 'TS' : 'JS'}</text>
    </svg>
  )
}

export function HeroGate({ onEnter }) {
  return (
    <section className="hero-gate" id="hero-gate" aria-label="Manimaran software developer portfolio">
      <div className="hero-gate-world" id="hero-gate-world">
        <CodeBackground language="react" density="dense" />
      </div>
      <div className="hero-gate-portal" id="hero-gate-portal">
        <div className="profile-portal">
          <img src={profile.photo} alt={profile.name} fetchPriority="high" width={768} height={1024} />
        </div>
      </div>
      <div className="hero-gate-shutter hero-gate-shutter-left" id="hero-gate-shutter-left" />
      <div className="hero-gate-shutter hero-gate-shutter-right" id="hero-gate-shutter-right" />

      <div className="hero-gate-copy" id="hero-gate-copy">
        <div className="kicker">
          {profile.title} · {profile.location} · {profile.experience}
        </div>
        <h2 className="headline">
          {profile.name}
          <br />
          <span className="headline-sub">{profile.tagline}</span>
        </h2>
        <p className="subline">
          Building mobile and backend applications with Flutter, Node.js, Express.js, TypeScript,
          PostgreSQL, and Prisma — including payments, maps, chat, and AI features.
        </p>
        <div className="hero-gate-actions">
          <button className="btn primary" type="button" onClick={onEnter}>
            View Experience
          </button>
          <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="btn" href={`mailto:${profile.email}`}>
            Email
          </a>
        </div>
      </div>

      <div className="hero-gate-cards" id="hero-gate-cards" aria-hidden="true">
        <article className="gate-card">
          <div className="gate-card-code">Dart</div>
          <span>
            Flutter
            <br />
            Mobile Apps
          </span>
        </article>
        <article className="gate-card">
          <div className="gate-card-code">TS</div>
          <span>
            Node.js
            <br />
            REST APIs
          </span>
        </article>
      </div>

      <div className="hero-gate-cta" id="hero-gate-cta" aria-hidden="true">
        <div>
          <div className="quote-karaoke" id="quote-karaoke">
            {['Flutter.', 'Node.js.', 'TypeScript.', 'PostgreSQL.', 'Prisma.', 'Shipping.', 'reliable.', 'software.'].map(
              (w) => (
                <span key={w} className="karaoke-word">
                  {w}
                </span>
              ),
            )}
          </div>
          <p className="quote-attrib">
            — {profile.name.toUpperCase()} · {profile.title.toUpperCase()}
          </p>
        </div>
      </div>
      <div className="hero-gate-cue" id="hero-gate-cue">
        Scroll through resume
      </div>
    </section>
  )
}

export function SceneSurface() {
  return (
    <section className="scene sc-surface" id="scene-surface">
      <div className="cam">
        <div className="scene-bg scene-bg--code">
          <CodeBackground language="react" density="dense" />
        </div>
        <div className="scene-tint scene-tint--light" />
      </div>
      <div className="copy">
        <div className="kicker">
          Resume // {profile.name} · {profile.title}
        </div>
        <h2 className="headline" data-scramble="">
          Mobile +
          <br />
          backend developer
        </h2>
        <p className="subline">
          1 year of industry experience building Flutter apps, Node.js/TypeScript APIs, PostgreSQL
          databases, payment flows, location features, chat, and AI-powered applications.
        </p>
      </div>
    </section>
  )
}

export function SceneAbout() {
  return (
    <section className="scene sc-kael" id="scene-kael">
      <div className="cam">
        <div className="scene-bg scene-bg--code">
          <CodeBackground language="dart" density="dense" />
        </div>
        <div className="scene-tint scene-tint--light" />
      </div>
      <div className="kael-figure">
        <div className="figure-frame profile-frame">
          <img src={profile.photo} alt={profile.name} loading="lazy" width={768} height={1024} />
          <div className="figure-tag">{profile.title}</div>
        </div>
      </div>
      <div className="copy">
        <div className="kicker">Professional Summary</div>
        <h2 className="headline" data-scramble="">
          Hands-on
          <br />
          software
          <br />
          developer
        </h2>
        <p className="subline">{profile.summary}</p>
        <div className="hud-data">
          NAME: <em>{profile.name.toUpperCase()}</em>
          <br />
          ROLE: <em>{profile.title.toUpperCase()}</em>
          <br />
          STACK: <em>{profile.tagline.toUpperCase()}</em>
          <br />
          LOCATION: <em>{profile.location.toUpperCase()}</em>
          <br />
          LANGUAGES: <em>TAMIL (NATIVE) · ENGLISH (PROFESSIONAL)</em>
        </div>
      </div>
    </section>
  )
}

export function SceneStack() {
  return (
    <section className="scene sc-core" id="scene-core">
      <div className="cam">
        <div className="scene-bg scene-bg--code">
          <CodeBackground language="typescript" density="dense" />
        </div>
        <div className="scene-tint scene-tint--light" />
      </div>
      <div className="core-rings">
        <span />
        <span />
        <span />
      </div>
      <div className="core-orb">
        <span className="halo" />
        <span className="pearl" />
      </div>
      <div className="copy copy--wide">
        <div className="kicker" style={{ justifyContent: 'center' }}>
          Technical Skills from Resume
        </div>
        <h2 className="headline" data-scramble="">
          Full technical stack
        </h2>
        <div className="skill-board">
          <div>
            <b>Languages</b>
            <p>{skills.languages.join(' · ')}</p>
          </div>
          <div>
            <b>Frontend & Mobile</b>
            <p>{skills.frontend.join(' · ')}</p>
          </div>
          <div>
            <b>Backend</b>
            <p>{skills.backend.join(' · ')}</p>
          </div>
          <div>
            <b>Database</b>
            <p>{skills.database.join(' · ')}</p>
          </div>
          <div>
            <b>Tools & DevOps</b>
            <p>{skills.devops.join(' · ')}</p>
          </div>
          <div>
            <b>Core Strengths</b>
            <p>{skills.strengths.join(' · ')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SceneExperience() {
  return (
    <section className="scene sc-nerissa" id="scene-nerissa">
      <div className="cam">
        <div className="scene-bg scene-bg--code">
          <CodeBackground language="typescript" density="dense" />
        </div>
        <div className="scene-tint scene-tint--light" />
      </div>
      <div className="nerissa-figure">
        <div className="figure-frame profile-frame profile-frame--soft">
          <img src={profile.photo} alt={`${profile.name} — ${experience.company}`} loading="lazy" />
          <div className="figure-tag">{experience.company}</div>
        </div>
      </div>
      <div className="pearl-gate left" />
      <div className="pearl-gate right" />
      <div className="copy copy--wide">
        <div className="kicker">
          Professional Experience // {experience.period}
        </div>
        <h2 className="headline" data-scramble="">
          Software Developer
          <br />
          at Zcodia
        </h2>
        <p className="subline experience-lead">
          {experience.role} at {experience.company}. Worked across frontend, mobile, backend, and
          database based on project needs.
        </p>
        <ul className="resume-bullets">
          {experience.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function SceneProjectSelect({ activeProject, onSelect }) {
  const project = activeProject || PROJECTS[0]

  return (
    <section className="scene sc-select" id="scene-select">
      <div className="ghost-name" id="ghost-name">
        {project.name.split(' ')[0]}
      </div>
      <div className="select-head">
        <h2 className="headline">Project experience</h2>
        <p className="subline">Select a project from the resume to inspect stack, scope, and outcomes.</p>
      </div>
      <div className="select-layout">
        <div className="portrait-panel" id="portrait-panel">
          <div className="portrait-code">
            <CodeBackground language={project.language} density="dense" />
          </div>
          <div className="scanline" />
          <div className="depth-glow" />
          <div className="portrait-tag" id="portrait-tag">
            {project.cls}
          </div>
        </div>
        <div className="dossier" id="dossier">
          <div className="char-role" id="d-role">
            {project.role} — {project.power}
          </div>
          <h3 className="d-item char-name" id="d-name">
            {project.name}
          </h3>
          <p className="d-item char-desc" id="d-desc">
            {project.details}
          </p>
          <div className="d-item meta-grid" id="d-meta">
            <div>
              <b>COMPANY</b>
              <span>{project.origin}</span>
            </div>
            <div>
              <b>CONTEXT</b>
              <span>{project.align}</span>
            </div>
            <div>
              <b>STACK</b>
              <span>{project.cls}</span>
            </div>
            <div>
              <b>FOCUS</b>
              <span>{project.power}</span>
            </div>
          </div>
          <div className="d-item abilities" id="d-abilities">
            {project.stack.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </div>
          <div className="d-item stats" id="d-stats">
            {Object.entries(project.stats).map(([k, v]) => (
              <div className="stat-row" key={k}>
                <span>{k}</span>
                <div className="bar">
                  <i style={{ width: `${v}%`, background: project.accent }} />
                </div>
                <span className="val">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="char-tabs" id="char-tabs">
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`char-tab ${p.id === project.id ? 'active' : ''}`}
            style={{ '--accent': p.accent }}
            onClick={() => onSelect?.(p.id)}
          >
            <LanguageIcon language={p.language} />
            <span className="t-name">
              <em>{LANGUAGE_LABELS[p.language] || p.language}</em>
              {p.name}
            </span>
          </button>
        ))}
      </div>
      <div className="guardian-scroll-hint">Scroll to browse projects</div>
    </section>
  )
}

export function SceneDelivery() {
  const p = PROJECTS[0]
  return (
    <section className="scene sc-vaelor" id="scene-vaelor">
      <div className="cam">
        <div className="scene-bg scene-bg--code">
          <CodeBackground language="dart" density="dense" />
        </div>
        <div className="scene-tint scene-tint--light" />
      </div>
      <div className="red-shift red-shift--soft" />
      <div className="pressure-rings">
        <span />
        <span />
        <span />
      </div>
      <div className="copy copy--wide">
        <div className="kicker">Project Experience // Delivery & Driver Application</div>
        <h2 className="headline red" data-scramble="">
          Delivery &
          <br />
          driver application
        </h2>
        <p className="subline">{p.details}</p>
        <div className="hud-data red">
          STACK: <em>{p.stack.join(' · ').toUpperCase()}</em>
          <br />
          FEATURES: <em>MAPS · ROUTES · RAZORPAY · NOTIFICATIONS</em>
          <br />
          SCOPE: <em>CUSTOMER APP · DRIVER APP · BACKEND APIS</em>
        </div>
      </div>
    </section>
  )
}

export function SceneAI() {
  const p = PROJECTS[1]
  return (
    <section className="scene sc-morvella" id="scene-morvella">
      <div className="cam">
        <div className="scene-bg scene-bg--code">
          <CodeBackground language="python" density="dense" />
        </div>
        <div className="scene-tint scene-tint--light" />
      </div>
      <div className="ink-cloud a ink-cloud--soft" />
      <div className="ink-cloud b ink-cloud--soft" />
      <div className="copy copy--wide">
        <div className="kicker">Project Experience // AI Assistant</div>
        <h2 className="headline ink" data-scramble="">
          AI assistant
          <br />
          with voice + LLM
        </h2>
        <p className="subline">{p.details}</p>
        <div className="hud-data ink">
          STACK: <em>{p.stack.join(' · ').toUpperCase()}</em>
          <br />
          CAPABILITIES: <em>CHAT · VOICE-TO-TEXT · LOCAL LLM</em>
          <br />
          NEXT: <em>MEMORY · COMMANDS · VISION · AUTOMATION</em>
        </div>
      </div>
    </section>
  )
}

export function SceneWorlds() {
  return (
    <section className="scene sc-worlds" id="scene-worlds">
      <div className="zones-track" id="zones-track">
        {ZONES.map((zone) => (
          <article className="zone" key={zone.name}>
            <div className="zone-bg">
              <CodeBackground language={zone.language} density="dense" />
            </div>
            <div className="zone-tint" style={{ background: zone.tint }} />
            <div className="zone-copy">
              <div className="zone-coord">{zone.coord}</div>
              <h3 className="zone-name">{zone.name}</h3>
              <p className="zone-desc">{zone.desc}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="worlds-head">
        <div className="kicker">Core strengths from resume</div>
        <h2 className="headline">Skills across the stack</h2>
      </div>
    </section>
  )
}

export function SceneSystems() {
  const enterprise = PROJECTS[2]
  return (
    <section className="scene sc-battle" id="scene-battle">
      <div className="cam">
        <div className="scene-bg scene-bg--code">
          <CodeBackground language="sql" density="dense" />
        </div>
        <div className="scene-tint scene-tint--light" />
      </div>
      <div className="systems-grid">
        {PROJECTS.map((p) => (
          <article key={p.id} className="tide-card" style={{ borderColor: p.accent }}>
            <div className="nm">{p.name}</div>
            <div className="fighter-desc">{p.desc}</div>
            <div className="lang-chip">{p.language}</div>
          </article>
        ))}
      </div>
      <div className="copy copy--wide">
        <div className="kicker" style={{ justifyContent: 'center' }}>
          Project Experience // Enterprise Work Tracking Application
        </div>
        <h2 className="headline" data-scramble="">
          Enterprise work
          <br />
          tracking application
        </h2>
        <p className="subline">
          {enterprise.details} Education: {education.degree}, {education.school} ({education.year}).
        </p>
        <div className="hud-data">
          STACK: <em>{enterprise.stack.join(' · ').toUpperCase()}</em>
          <br />
          EDUCATION: <em>
            {education.degree.toUpperCase()} · {education.school.toUpperCase()} · {education.year}
          </em>
        </div>
      </div>
      <div className="flash" />
    </section>
  )
}

export function SceneContact() {
  return (
    <section className="scene sc-cta" id="scene-cta">
      <div className="cta-core">
        <span className="halo" />
        <span className="orbiter" />
        <span className="pearl" />
      </div>
      <div className="copy">
        <div className="cta-profile">
          <img src={profile.photo} alt={profile.name} loading="lazy" />
        </div>
        <h2 className="headline" data-scramble="">
          Let&apos;s work together
        </h2>
        <p className="subline">
          Open to software developer roles and freelance work across Flutter, Node.js, TypeScript,
          and full-stack systems.
          <br />
          {profile.email} · {profile.phone}
        </p>
        <div className="cta-actions">
          <a className="btn primary" href={`mailto:${profile.email}`}>
            Email Me
          </a>
          <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="btn" href={profile.naukri} target="_blank" rel="noopener noreferrer">
            Naukri
          </a>
        </div>
        <form
          className="signal-form"
          id="contact-form"
          onSubmit={(e) => {
            e.preventDefault()
            const email = new FormData(e.currentTarget).get('email') || ''
            window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
              `Portfolio inquiry from ${email}`,
            )}`
          }}
        >
          <input type="email" name="email" placeholder="Your email" aria-label="Email address" required />
          <button type="submit">Send</button>
        </form>
        <div className="cta-footer">
          {profile.name.toUpperCase()} · {profile.title.toUpperCase()}
          <br />
          EMAIL: <em>{profile.email}</em> — PHONE: <em>{profile.phone}</em> — GITHUB:{' '}
          <em>github.com/MDLMani</em>
        </div>
      </div>
    </section>
  )
}
