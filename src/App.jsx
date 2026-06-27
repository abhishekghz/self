import { useEffect, useState, useCallback } from 'react'
import NeuralBackground from './NeuralBackground.jsx'
import { Reveal, CountUp, Lightbox } from './ui.jsx'
import {
  profile, socials, stats, skills, focus, experience, education,
  publications, patent, projects, conferences, certificates, confGallery,
  talks, talkGallery, leadership, reviewing, nav,
} from './data.js'

const Icon = ({ name }) => {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const paths = {
    shield: <path {...p} d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
    brain: <path {...p} d="M8 7a3 3 0 016 0M9 4a3 3 0 00-3 3v1a3 3 0 000 6 3 3 0 003 3M15 4a3 3 0 013 3v1a3 3 0 010 6 3 3 0 01-3 3M12 4v16" />,
    leaf: <path {...p} d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14-1 0-1-1-1-1zM5 19c3-3 5-5 9-7" />,
    bot: <path {...p} d="M12 7V4M8 11h.01M16 11h.01M6 8h12a1 1 0 011 1v7a2 2 0 01-2 2H7a2 2 0 01-2-2V9a1 1 0 011-1zM3 13v2M21 13v2" />,
  }
  return <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">{paths[name]}</svg>
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('')
  const [prog, setProg] = useState(0)

  // certificate / gallery lightbox state
  const [lbItems, setLbItems] = useState([])
  const [lbIndex, setLbIndex] = useState(null)
  const openLb = (items, i) => { setLbItems(items); setLbIndex(i) }
  const closeLb = () => setLbIndex(null)
  const navLb = (d) => setLbIndex((i) => (i + d + lbItems.length) % lbItems.length)

  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(st > 40)
      setProg(max > 0 ? (st / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // scroll-spy for active nav item
  useEffect(() => {
    const ids = nav.map((n) => n.id)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const go = useCallback((e, id) => {
    e.preventDefault()
    setMenu(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const year = new Date().getFullYear()

  return (
    <>
      <div className="aurora" aria-hidden="true">
        <span className="au a1" /><span className="au a2" /><span className="au a3" />
      </div>
      <NeuralBackground />
      <div className="bg-glow" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      <div className="progress" style={{ width: `${prog}%` }} />

      {/* NAV */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#top" className="brand" onClick={(e) => go(e, 'top')}>
          <span className="brand-mark">AG</span>
          <span>Abhishek <b>Gautam</b></span>
        </a>
        <div className={`nav-links ${menu ? 'open' : ''}`}>
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={(e) => go(e, n.id)}
               className={active === n.id ? 'on' : ''}>{n.label}</a>
          ))}
          <a className="nav-cta" href={profile.cv} download>Download CV</a>
        </div>
        <button className={`burger ${menu ? 'x' : ''}`} aria-label="Menu" onClick={() => setMenu((m) => !m)}>
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* HERO */}
      <header className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-text">
            <Reveal as="div" className="kicker">{profile.title}</Reveal>
            <Reveal as="h1" delay={80}>Abhishek<br /><span className="grad">Gautam</span></Reveal>
            <Reveal as="p" className="hero-tag" delay={160}>{profile.tagline}</Reveal>
            <Reveal className="hero-cta" delay={240}>
              <a className="btn btn-primary" href="#contact" onClick={(e) => go(e, 'contact')}>Get in touch</a>
              <a className="btn btn-ghost" href={profile.cv} download>↓ Download CV</a>
            </Reveal>
            <Reveal className="hero-socials" delay={300}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                  <span className="dot">{s.short}</span>{s.label}
                </a>
              ))}
            </Reveal>
          </div>
          <Reveal className="hero-portrait" delay={200}>
            <div className="portrait-ring">
              <div className="portrait-inner">
                <img src={profile.heroImg} alt="Abhishek Gautam" loading="eager" />
              </div>
            </div>
            <div className="portrait-badge">
              <span className="pulse" /> Available for research collaborations
            </div>
          </Reveal>
        </div>
        <div className="metrics">
          {stats.map((s, i) => (
            <Reveal className="metric" key={s.label} delay={i * 80}>
              <div className="m-n"><CountUp to={s.n} suffix={s.suffix} /></div>
              <div className="m-l">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </header>

      {/* ABOUT */}
      <section id="about">
        <div className="wrap">
          <SecHead k="01 — About" title="Researcher, engineer, community builder" />
          <div className="about-grid">
            <div>
              <Reveal as="p" className="about-lead">{profile.about}</Reveal>
              <Reveal as="p" className="about-body" delay={80}>{profile.aboutExtra}</Reveal>
              <Reveal className="chips" delay={140}>
                {skills.map((s) => <span className="chip" key={s}>{s}</span>)}
              </Reveal>
            </div>
            <Reveal className="snapshot" delay={120}>
              <div className="snap-top">
                <span className="snap-mono">AG</span>
                <span className="snap-sig">Abhishek&nbsp;Gautam</span>
              </div>
              <p className="snap-quote">“Bridging cutting-edge AI with practical, real-world impact.”</p>
              <div className="snap-rows">
                <div className="snap-row"><span>Role</span><span>Integrated PhD (IDDP)</span></div>
                <div className="snap-row"><span>Institute</span><span>AcSIR · CSIR-CSIO</span></div>
                <div className="snap-row"><span>Focus</span><span>ML · DL · CV · Defence</span></div>
                <div className="snap-row"><span>Based in</span><span>Chandigarh, India</span></div>
                <div className="snap-row"><span>Community</span><span>Co-Organiser, GDG Ludhiana</span></div>
              </div>
            </Reveal>
          </div>

          <div className="focus-grid">
            {focus.map((f, i) => (
              <Reveal className="focus-card" key={f.title} delay={i * 70}>
                <span className="focus-ic"><Icon name={f.icon} /></span>
                <h4>{f.title}</h4>
                <p>{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE + EDUCATION */}
      <section id="experience">
        <div className="wrap">
          <SecHead k="02 — Journey" title="Experience & Education" />
          <div className="two-col">
            <div>
              <h3 className="col-h">Research Experience</h3>
              <div className="timeline">
                {experience.map((x, i) => (
                  <Reveal className="t-item" key={x.role} delay={i * 60}>
                    <div className="t-logo"><img src={x.logo} alt="" loading="lazy" /></div>
                    <div>
                      <div className="t-when">{x.when}</div>
                      <div className="t-role">{x.role}</div>
                      <div className="t-org">{x.org}</div>
                      <div className="t-desc">{x.desc}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <div>
              <h3 className="col-h">Education</h3>
              <div className="timeline edu">
                {education.map((x, i) => (
                  <Reveal className="t-item simple" key={x.degree} delay={i * 60}>
                    <div>
                      <div className="t-when">{x.when}</div>
                      <div className="t-role">{x.degree}</div>
                      <div className="t-org">{x.org}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <h3 className="col-h" style={{ marginTop: '2.4rem' }}>Leadership & Service</h3>
              <div className="mini-list">
                {leadership.map((l, i) => (
                  <Reveal className="mini" key={l.role} delay={i * 50}>
                    <span className="mini-mk">★</span>
                    <div><b>{l.role}</b><small>{l.org} · {l.when}</small></div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH */}
      <section id="research">
        <div className="wrap">
          <SecHead k="03 — Research" title="Publications & Patent" />
          <div className="pub-list">
            {publications.map((p, i) => (
              <Reveal className="pub" key={p.title} delay={i * 50}>
                <div className="pub-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="pub-body">
                  <h4>{p.title}</h4>
                  <div className="pub-auth">{p.authors}</div>
                  <div className="pub-venue">{p.venue}</div>
                  {p.badge && <span className="pub-badge">{p.badge}</span>}
                </div>
                <div className="pub-yr">{p.year}</div>
              </Reveal>
            ))}
          </div>
          <Reveal className="patent">
            <div className="k">{patent.id}</div>
            <h3>{patent.title}</h3>
            <p>{patent.authors}</p>
          </Reveal>

          <h3 className="col-h" style={{ marginTop: '3rem' }}>Conference Presentations</h3>
          <div className="conf-list">
            {conferences.map((c, i) => (
              <Reveal className="conf" key={c.title} delay={i * 50}>
                <span className="conf-mk">›</span>
                <div><b>{c.title}</b><small>{c.meta}</small></div>
              </Reveal>
            ))}
          </div>
          <div className="thumb-row">
            {confGallery.map((src, i) => (
              <Reveal as="button" className="thumb" key={src} delay={i * 50}
                onClick={() => openLb(confGallery, i)}>
                <img src={src} alt={`Conference ${i + 1}`} loading="lazy" />
                <span className="thumb-zoom">⤢</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="wrap">
          <SecHead k="04 — Projects" title="Applied research projects" />
          <div className="proj-grid">
            {projects.map((p, i) => (
              <Reveal className="proj-card" key={p.title} delay={i * 70}>
                <div className="k">{p.tag}</div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <div className="pills">{p.pills.map((x) => <span key={x}>{x}</span>)}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certs">
        <div className="wrap">
          <SecHead k="05 — Recognition" title="Certifications & Awards"
            sub="13 verified certificates across defence research, peer-reviewing and training. Click any card to view the full certificate." />
          <div className="cert-grid">
            {certificates.map((c, i) => (
              <Reveal as="button" className="cert-card" key={c.src} delay={(i % 4) * 60}
                onClick={() => openLb(certificates, i)}>
                <div className="cert-img"><img src={c.src} alt={c.title} loading="lazy" /><span className="thumb-zoom">⤢</span></div>
                <div className="cert-meta">
                  <strong>{c.title}</strong>
                  <span>{c.org}</span>
                  <em>{c.year}</em>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community">
        <div className="wrap">
          <SecHead k="06 — Community" title="Talks, Mentoring & Reviewing" />
          <div className="two-col">
            <div>
              <h3 className="col-h">Hackathon Mentoring & Guest Lectures</h3>
              <div className="mini-list">
                {talks.map((t, i) => (
                  <Reveal className="mini" key={t.title} delay={i * 50}>
                    <span className="mini-mk">◆</span>
                    <div><b>{t.title}</b><small>{t.role}</small></div>
                  </Reveal>
                ))}
              </div>
            </div>
            <div>
              <h3 className="col-h">Peer Reviewing</h3>
              <div className="mini-list">
                {reviewing.map((r, i) => (
                  <Reveal className="mini" key={r.role} delay={i * 50}>
                    <span className="mini-mk">✓</span>
                    <div><b>{r.role}</b><small>{r.org} · {r.when}</small></div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
          <h3 className="col-h" style={{ marginTop: '2.6rem' }}>Glimpses</h3>
          <div className="masonry">
            {talkGallery.map((src, i) => (
              <Reveal as="button" className="ms-item" key={src} delay={(i % 4) * 50}
                onClick={() => openLb(talkGallery, i)}>
                <img src={src} alt={`Event ${i + 1}`} loading="lazy" />
                <span className="thumb-zoom">⤢</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="wrap">
          <Reveal className="contact">
            <div className="k center">07 — Contact</div>
            <h2>Let's build something <span className="grad">intelligent</span>.</h2>
            <p>Open to research collaborations, speaking invitations and meaningful AI projects. Email is the fastest way to reach me.</p>
            <div className="contact-actions">
              <a className="btn btn-primary" href={`mailto:${profile.email}`}>✉ {profile.email}</a>
              <a className="btn btn-ghost" href={profile.cv} download>↓ Download CV</a>
            </div>
            <div className="contact-row">
              <a href={`tel:${profile.phoneRaw}`}>☎ {profile.phone}</a>
              <a href={`mailto:${profile.emailAlt}`}>✉ {profile.emailAlt}</a>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <footer>
        <span>© {year} Abhishek Gautam — AI Researcher & ML Engineer</span>
        <a href="#top" onClick={(e) => go(e, 'top')}>Back to top ↑</a>
      </footer>

      <Lightbox items={lbItems} index={lbIndex} onClose={closeLb} onNav={navLb} />
    </>
  )
}

function SecHead({ k, title, sub }) {
  return (
    <div className="sec-head">
      <Reveal as="div" className="sec-k">{k}</Reveal>
      <Reveal as="h2" className="sec-title" delay={60}>{title}</Reveal>
      {sub && <Reveal as="p" className="sec-sub" delay={120}>{sub}</Reveal>}
    </div>
  )
}
