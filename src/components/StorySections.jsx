import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ABOUT, QA, PROJECTS, profile } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function StorySections({ onOpenAbout, onOpenQa, onOpenProject }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const isMobile = window.matchMedia('(max-width: 860px)').matches

    const ctx = gsap.context(() => {
      // Elements reveal with silky GSAP bounceback
      gsap.utils.toArray('.story-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: isMobile ? 32 : 48, scale: isMobile ? 0.96 : 1 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: isMobile ? 0.75 : 0.9,
            ease: isMobile ? 'back.out(1.5)' : 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
              fastScrollEnd: true,
            },
          },
        )
      })

      // On mobile, one-shot hardware-accelerated reveal eliminates continuous image render thrashing;
      // on desktop, scrubbed parallax runs smoothly on fine pointers.
      if (isMobile) {
        gsap.utils.toArray('.story-media img').forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.08, opacity: 0.75 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.85,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: img.parentElement,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                fastScrollEnd: true,
              },
            },
          )
        })
      } else {
        gsap.utils.toArray('.story-media img').forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.08, y: 24 },
            {
              scale: 1,
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: img.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          )
        })
      }
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div className="story" ref={rootRef}>
      <section className="story-section" id="about" aria-labelledby="about-title">
        <div className="story-grid">
          <div className="story-copy story-reveal">
            <p className="story-eyebrow">{ABOUT.eyebrow}</p>
            <h2 id="about-title">{ABOUT.title}</h2>
            <p className="story-lead">{ABOUT.lead}</p>
            {ABOUT.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="story-highlights">
              {ABOUT.highlights.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <button type="button" className="hax-cta" onClick={onOpenAbout}>
              Open About panel
            </button>
          </div>
          <figure className="story-media story-reveal">
            <img src={ABOUT.image} alt="Abstract technology atmosphere for About section" loading="lazy" />
            <figcaption>
              <img src={profile.photo} alt="" width={44} height={44} />
              <div>
                <strong>{profile.name}</strong>
                <span>{profile.title}</span>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="story-section story-section--qa" id="qa" aria-labelledby="qa-title">
        <div className="story-grid story-grid--flip">
          <figure className="story-media story-reveal">
            <img src={QA.image} alt="Quality assurance and testing workspace atmosphere" loading="lazy" />
          </figure>
          <div className="story-copy story-reveal">
            <p className="story-eyebrow">{QA.eyebrow}</p>
            <h2 id="qa-title">{QA.title}</h2>
            <p className="story-lead">{QA.lead}</p>
            <div className="story-qa-blocks">
              <div className="story-qa-block">
                <h3>{QA.doneTitle}</h3>
                <ul>
                  {QA.done.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="story-qa-block">
                <h3>{QA.knowTitle}</h3>
                <ul>
                  {QA.know.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <button type="button" className="hax-cta" onClick={onOpenQa}>
              Explore QA work
            </button>
          </div>
        </div>
      </section>

      <section className="story-section story-section--projects" id="projects" aria-labelledby="projects-title">
        <header className="story-head story-reveal">
          <p className="story-eyebrow">SELECTED WORK</p>
          <h2 id="projects-title">Engineering showcase</h2>
          <p className="story-lead">Enterprise supply chain, ride-hailing ops, AI agent platforms, and real-time trackers.</p>
        </header>

        <div className="story-cards">
          {PROJECTS.map((proj, idx) => (
            <article
              key={proj.id}
              className="story-card story-reveal"
              role="button"
              tabIndex={0}
              onClick={() => onOpenProject(idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onOpenProject(idx)
                }
              }}
            >
              <div className="story-card__media">
                <img src={proj.image} alt="" loading="lazy" />
              </div>
              <div className="story-card__body">
                <span className="story-card__num">0{idx + 1}</span>
                <h3>{proj.name}</h3>
                <p>{proj.short}</p>
                <div className="story-card__stack">
                  {proj.stack.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
