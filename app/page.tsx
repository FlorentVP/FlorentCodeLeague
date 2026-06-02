'use client'

import { useEffect, useState } from 'react'
import Leaderboard from './components/Leaderboard'

const SLIDESHOW_IMAGES = [
  '/images/ChatGPT%20Image%20May%2015%2C%202026%2C%2011_23_54%20AM.png',
  '/images/ChatGPT%20Image%20May%2015%2C%202026%2C%2011_59_30%20AM.png',
  '/images/Spring_Hackathon_final_Gustaf_Bergman-Ekstrom-82.jpg',
  '/images/Spring_Hackathon_final_Gustaf_Bergman-Ekstrom-71.jpg',
  '/images/Spring_Hackathon_final_Gustaf_Bergman-Ekstrom-76.jpg',
  '/images/Spring_Hackathon_final_Gustaf_Bergman-Ekstrom-79.jpg',
  '/images/Spring_Hackathon_final_Gustaf_Bergman-Ekstrom-62.jpg',
]

function HowItWorksSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDESHOW_IMAGES.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="slideshow">
      <div className="slideshow-img">
        <img src={SLIDESHOW_IMAGES[current]} alt="Competition moment" />
      </div>
      <div className="slideshow-bars">
        {SLIDESHOW_IMAGES.map((_, i) => (
          <button
            key={i}
            className={`slideshow-bar${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  )
}

const TARGET = new Date('2026-08-01T09:00:00')

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function getTimeLeft() {
  const diff = Math.max(0, TARGET.getTime() - Date.now())
  return {
    days: pad(Math.floor(diff / 86400000)),
    hours: pad(Math.floor((diff % 86400000) / 3600000)),
    mins: pad(Math.floor((diff % 3600000) / 60000)),
    secs: pad(Math.floor((diff % 60000) / 1000)),
  }
}

const PERSONAL_DOMAINS = ['gmail.com','yahoo.com','hotmail.com','outlook.com','icloud.com','me.com','live.com','msn.com','protonmail.com','aol.com']

function isSchoolEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase()
  if (!domain) return false
  return !PERSONAL_DOMAINS.includes(domain)
}

type Applicant = {
  fullName: string
  email: string
  linkedin: string
  discord: string
  hometown: string
  company: string
  school: string
  role: 'student' | 'professional' | ''
}

const emptyApplicant = (): Applicant => ({
  fullName: '', email: '', linkedin: '', discord: '', hometown: '', company: '', school: '', role: 'student',
})

type Errors = Record<string, string>

function validateApplicant(a: Applicant, prefix: string): Errors {
  const e: Errors = {}
  if (!a.fullName.trim()) e[`${prefix}.fullName`] = 'Required'
  if (!a.email.trim()) e[`${prefix}.email`] = 'Required'
  else if (!a.email.includes('@')) e[`${prefix}.email`] = 'Invalid email'
  if (!a.linkedin.trim()) e[`${prefix}.linkedin`] = 'Required'
  if (!a.hometown.trim()) e[`${prefix}.hometown`] = 'Required'
  return e
}

function ApplicantFields({
  prefix,
  data,
  onChange,
  errors,
}: {
  prefix: string
  data: Applicant
  onChange: (field: keyof Applicant, value: string) => void
  errors: Errors
}) {
  return (
    <div className="apply-fields">
      <div className="apply-field full">
        <span className="field-lbl">I am a *</span>
        <div className="role-toggle">
          <button
            type="button"
            className={`role-btn${data.role === 'student' ? ' active' : ''}`}
            onClick={() => onChange('role', 'student')}
          >Student</button>
          <button
            type="button"
            className={`role-btn${data.role === 'professional' ? ' active' : ''}`}
            onClick={() => onChange('role', 'professional')}
          >Founder / Employee</button>
        </div>
      </div>
      <div className="apply-field">
        <span className="field-lbl">Full Name *</span>
        <input
          className="field-input"
          placeholder="Ada Lovelace"
          value={data.fullName}
          onChange={e => onChange('fullName', e.target.value)}
        />
        {errors[`${prefix}.fullName`] && <span className="field-error">{errors[`${prefix}.fullName`]}</span>}
      </div>
      <div className="apply-field">
        <span className="field-lbl">Email *</span>
        <input
          className="field-input"
          type="email"
          placeholder="ada@kth.se"
          value={data.email}
          onChange={e => onChange('email', e.target.value)}
        />
        {errors[`${prefix}.email`] && <span className="field-error">{errors[`${prefix}.email`]}</span>}
      </div>
      <div className="apply-field">
        <span className="field-lbl">LinkedIn *</span>
        <input
          className="field-input"
          placeholder="linkedin.com/in/ada"
          value={data.linkedin}
          onChange={e => onChange('linkedin', e.target.value)}
        />
        {errors[`${prefix}.linkedin`] && <span className="field-error">{errors[`${prefix}.linkedin`]}</span>}
      </div>
      <div className="apply-field">
        <span className="field-lbl">Hometown *</span>
        <input
          className="field-input"
          placeholder="Stockholm"
          value={data.hometown}
          onChange={e => onChange('hometown', e.target.value)}
        />
        {errors[`${prefix}.hometown`] && <span className="field-error">{errors[`${prefix}.hometown`]}</span>}
      </div>
      {data.role === 'student' && (
        <div className="apply-field full">
          <span className="field-lbl">University / School</span>
          <input
            className="field-input"
            placeholder="KTH Royal Institute of Technology"
            value={data.school}
            onChange={e => onChange('school', e.target.value)}
          />
        </div>
      )}
      {data.role === 'professional' && (
        <div className="apply-field full">
          <span className="field-lbl">Company</span>
          <input
            className="field-input"
            placeholder="Acme Inc."
            value={data.company}
            onChange={e => onChange('company', e.target.value)}
          />
        </div>
      )}
      <div className="apply-field full">
        <span className="field-lbl">Discord (optional)</span>
        <input
          className="field-input"
          placeholder="ada#1234"
          value={data.discord}
          onChange={e => onChange('discord', e.target.value)}
        />
      </div>
    </div>
  )
}

function ApplyForm() {
  const [type, setType] = useState<'individual' | 'team'>('individual')
  const [primary, setPrimary] = useState<Applicant>(emptyApplicant())
  const [teamName, setTeamName] = useState('')
  const [teammates, setTeammates] = useState<Applicant[]>([])
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function updatePrimary(field: keyof Applicant, value: string) {
    setPrimary(p => ({ ...p, [field]: value }))
    setErrors(e => { const n = { ...e }; delete n[`primary.${field}`]; return n })
  }

  function updateTeammate(i: number, field: keyof Applicant, value: string) {
    setTeammates(ts => ts.map((t, idx) => idx === i ? { ...t, [field]: value } : t))
    setErrors(e => { const n = { ...e }; delete n[`teammate${i}.${field}`]; return n })
  }

  function addTeammate() {
    if (teammates.length < 5) setTeammates(ts => [...ts, emptyApplicant()])
  }

  function removeTeammate(i: number) {
    setTeammates(ts => ts.filter((_, idx) => idx !== i))
  }

  async function handleSubmit() {
    const e: Errors = { ...validateApplicant(primary, 'primary') }
    if (type === 'team') {
      if (!teamName.trim()) e['teamName'] = 'Required'
      teammates.forEach((t, i) => {
        Object.assign(e, validateApplicant(t, `teammate${i}`))
      })
    }
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, primary, teamName, teammates }),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="form-success">
        <div className="success-lbl">Application received</div>
        <div className="success-title">You&apos;re in the queue.</div>
        <div className="success-sub">
          We review applications manually. If you&apos;re selected, you&apos;ll hear from us before July 2026.
        </div>
        <div className="apply-divider" />
        <p style={{fontSize: '0.92em', color: 'rgba(255,255,255,0.6)', marginBottom: '28px', fontWeight: 300, lineHeight: 1.6}}>
          Follow Florent on LinkedIn so we can connect and keep track of your profile.
        </p>
        <a
          href="https://www.linkedin.com/company/florent-vc"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-white"
        >
          Follow on LinkedIn
        </a>
      </div>
    )
  }

  return (
    <div className="apply-form">
      <div className="apply-toggle">
        <button
          className={`toggle-btn${type === 'individual' ? ' active' : ''}`}
          onClick={() => { setType('individual'); setTeammates([]) }}
        >
          Individual
        </button>
        <button
          className={`toggle-btn${type === 'team' ? ' active' : ''}`}
          onClick={() => setType('team')}
        >
          Team
        </button>
      </div>

      <span className="apply-section-lbl">Your details</span>
      <ApplicantFields prefix="primary" data={primary} onChange={updatePrimary} errors={errors} />

      {type === 'team' && (
        <>
          <div className="apply-divider" />
          <span className="apply-section-lbl">Team</span>
          <div className="apply-fields" style={{marginBottom: '24px'}}>
            <div className="apply-field full">
              <span className="field-lbl">Team Name *</span>
              <input
                className="field-input"
                placeholder="Team Axionite"
                value={teamName}
                onChange={e => { setTeamName(e.target.value); setErrors(er => { const n = {...er}; delete n['teamName']; return n }) }}
              />
              {errors['teamName'] && <span className="field-error">{errors['teamName']}</span>}
            </div>
          </div>

          {teammates.map((tm, i) => (
            <div key={i} className="teammate-block">
              <div className="teammate-header">
                <span className="teammate-num">Teammate {i + 1}</span>
                <button className="remove-btn" onClick={() => removeTeammate(i)}>Remove</button>
              </div>
              <div className="teammate-fields">
                <div className="apply-field">
                  <span className="field-lbl">Full Name *</span>
                  <input className="field-input" placeholder="Full Name" value={tm.fullName} onChange={e => updateTeammate(i, 'fullName', e.target.value)} />
                  {errors[`teammate${i}.fullName`] && <span className="field-error">{errors[`teammate${i}.fullName`]}</span>}
                </div>
                <div className="apply-field">
                  <span className="field-lbl">School Email *</span>
                  <input className="field-input" type="email" placeholder="name@uni.edu" value={tm.email} onChange={e => updateTeammate(i, 'email', e.target.value)} />
                  {errors[`teammate${i}.email`] && <span className="field-error">{errors[`teammate${i}.email`]}</span>}
                </div>
                <div className="apply-field">
                  <span className="field-lbl">LinkedIn *</span>
                  <input className="field-input" placeholder="linkedin.com/in/..." value={tm.linkedin} onChange={e => updateTeammate(i, 'linkedin', e.target.value)} />
                  {errors[`teammate${i}.linkedin`] && <span className="field-error">{errors[`teammate${i}.linkedin`]}</span>}
                </div>
                <div className="apply-field">
                  <span className="field-lbl">Hometown *</span>
                  <input className="field-input" placeholder="City" value={tm.hometown} onChange={e => updateTeammate(i, 'hometown', e.target.value)} />
                  {errors[`teammate${i}.hometown`] && <span className="field-error">{errors[`teammate${i}.hometown`]}</span>}
                </div>
                <div className="apply-field full">
                  <span className="field-lbl">Discord (optional)</span>
                  <input className="field-input" placeholder="handle#1234" value={tm.discord} onChange={e => updateTeammate(i, 'discord', e.target.value)} />
                </div>
              </div>
            </div>
          ))}

          <button
            className="add-teammate-btn"
            onClick={addTeammate}
            disabled={teammates.length >= 5}
          >
            + Add teammate {teammates.length > 0 ? `(${teammates.length}/5)` : ''}
          </button>
        </>
      )}

      <div className="apply-submit">
        <button className="btn-white" onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Apply for Selection'}
        </button>
        {errors['submit'] && (
          <span style={{fontSize: '0.72em', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,80,80,0.9)'}}>
            {errors['submit']}
          </span>
        )}
        {Object.keys(errors).filter(k => k !== 'submit').length > 0 && (
          <span style={{fontSize: '0.72em', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,80,80,0.9)'}}>
            Fix errors above
          </span>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div id="fvp-root" className="wrapper">

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {['Stockholm','Copenhagen','Oslo','Helsinki','Gothenburg','Reykjavik','Århus','Bergen','Tampere','Malmö','€20K Prize','Launching August 2026','Stockholm','Copenhagen','Oslo','Helsinki','Gothenburg','Reykjavik','Århus','Bergen','Tampere','Malmö','€20K Prize','Launching August 2026'].map((item, i) => (
            <span key={i} className="t-item">{item} <img src="/bot-king.png" alt="" className="ticker-bot" /></span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="hero-eyebrow">Launching August 2026 -- Applications Open Now</div>
        <div className="hero-logo">
          <div className="hero-logo-text">
            <div className="hero-logo-florent">FLORENT</div>
            <div className="hero-logo-cl">&lt;CODE LEAGUE&gt;</div>
          </div>
        </div>
        <p className="hero-sub">Find out if you&apos;re in the top 1% of programmers in the Nordics.</p>
        <div className="cd-bar">
          <div className="cd-unit"><span className="cd-num">{time.days}</span><span className="cd-lbl">Days</span></div>
          <span className="cd-sep">:</span>
          <div className="cd-unit"><span className="cd-num">{time.hours}</span><span className="cd-lbl">Hours</span></div>
          <span className="cd-sep">:</span>
          <div className="cd-unit"><span className="cd-num">{time.mins}</span><span className="cd-lbl">Min</span></div>
          <span className="cd-sep">:</span>
          <div className="cd-unit"><span className="cd-num">{time.secs}</span><span className="cd-lbl">Sec</span></div>
        </div>
        <div className="meta-row">
          <div className="meta-item"><span className="meta-lbl">Format</span><span className="meta-val">3 weeks online -- live finals Stockholm</span></div>
          <div className="meta-item"><span className="meta-lbl">Open to</span><span className="meta-val">Created for University Students, Open for Everyone</span></div>
          <div className="meta-item"><span className="meta-lbl">Experience</span><span className="meta-val">Not required. Fast learning is.</span></div>
        </div>
        <a href="#apply" className="btn-white">Apply for Selection</a>
        <a href="#how-it-works" className="btn-ghost">How it works</a>
      </div>


      {/* SPONSORS */}
      <div className="sponsors">
        <div className="sponsors-label">Sponsored by</div>
        <div className="sponsors-grid">
          <div className="sponsor-item">
            <img src="/logos/anthropic.svg" alt="Anthropic" />
          </div>
        </div>
      </div>

      {/* 01 WHAT YOU BUILD */}
      <div className="section" id="what-you-build">
        <div className="sec-hd"><span className="sec-num">01</span><h2 className="sec-title">What You Build</h2></div>
        <p className="body-lg">You write code that controls an autonomous system competing against others in a live arena. Once deployed, it runs on its own.</p>
        <div className="build-grid">
          <div className="build-cell"><span className="build-lbl">Objective 01</span><div className="build-txt">Secure resources and expand territory</div></div>
          <div className="build-cell"><span className="build-lbl">Objective 02</span><div className="build-txt">Coordinate at scale across the arena</div></div>
          <div className="build-cell"><span className="build-lbl">Objective 03</span><div className="build-txt">Adapt to changing conditions in real time</div></div>
          <div className="build-cell"><span className="build-lbl">Objective 04</span><div className="build-txt">Outmaneuver opponents on the live ladder</div></div>
        </div>
        <div className="build-footer">You&apos;re not playing the game. You&apos;re building the player.</div>
      </div>

      {/* WHY JOIN */}
      <div className="section" id="why-join">
        <div className="sec-hd"><span className="sec-num">02</span><h2 className="sec-title">Why Join</h2></div>
        <div className="prize-box">
          <div className="prize-box-content">
            <div className="prize-amt">€20K</div>
            <p className="prize-lbl">Cash prize to the winning team. Compete against the strongest technical talent in the Nordics.</p>
          </div>
          <div className="prize-ticker-wrap">
            <div className="prize-ticker-track">
              {Array.from({length: 20}, (_, i) => (
                <span key={i} className="prize-ticker-item">€</span>
              )).flatMap((el, i) => [el, <span key={`bot${i}`} className="prize-ticker-item"><img src="/bot-king.png" alt="" className="prize-bot" /></span>])}
              {Array.from({length: 20}, (_, i) => (
                <span key={`b${i}`} className="prize-ticker-item">€</span>
              )).flatMap((el, i) => [el, <span key={`bbot${i}`} className="prize-ticker-item"><img src="/bot-king.png" alt="" className="prize-bot" /></span>])}
            </div>
          </div>
        </div>
        <div className="perks">
          <div className="perk"><span className="perk-dash">--</span><p className="perk-txt">Get noticed by Europe's best AI companies</p></div>
          <div className="perk"><span className="perk-dash">--</span><p className="perk-txt">Direct exposure to top VC firms</p></div>
          <div className="perk"><span className="perk-dash">--</span><p className="perk-txt">Top 32 teams qualify for Stockholm finals</p></div>
          <div className="perk"><span className="perk-dash">--</span><p className="perk-txt">Finalists flown to Stockholm, all expenses covered</p></div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="section" id="timeline">
        <div className="sec-hd"><span className="sec-num">07</span><h2 className="sec-title">Timeline</h2></div>
        <div className="tl-track">
          <div className="tl-node tl-node--active">
            <div className="tl-node-date">Now</div>
            <div className="tl-marker">
              <div className="tl-pulse" />
              <div className="tl-dot" />
            </div>
            <div className="tl-evt">
              Applications Open
              <div className="tl-live">Live</div>
            </div>
          </div>
          <div className="tl-node">
            <div className="tl-node-date">July 2026</div>
            <div className="tl-marker"><div className="tl-dot" /></div>
            <div className="tl-evt">Selection decisions sent</div>
          </div>
          <div className="tl-node">
            <div className="tl-node-date">August 2026</div>
            <div className="tl-marker"><div className="tl-dot" /></div>
            <div className="tl-evt">3-week online competition</div>
          </div>
          <div className="tl-node">
            <div className="tl-node-date">Late August</div>
            <div className="tl-marker"><div className="tl-dot" /></div>
            <div className="tl-evt">Live finals, Stockholm</div>
          </div>
        </div>
      </div>

      {/* 02 HOW IT WORKS */}
      <div className="section" id="how-it-works">
        <div className="how-it-works-split">
          <HowItWorksSlideshow />
          <div className="how-it-works-content">
            <div className="sec-hd"><span className="sec-num">02</span><h2 className="sec-title">How It Works</h2></div>
            <div className="steps">
              <div className="step"><span className="step-n">01</span><span className="step-c">Apply and get selected by Florent</span></div>
              <div className="step"><span className="step-n">02</span><span className="step-c">Build your system using starter bot and tutorials</span></div>
              <div className="step"><span className="step-n">03</span><span className="step-c">Compete on the live Nordic ladder</span></div>
              <div className="step"><span className="step-n">04</span><span className="step-c">Improve daily and climb the rankings over 3 weeks</span></div>
              <div className="step"><span className="step-n">05</span><span className="step-c">Top 32 teams qualify for the Stockholm finals</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* 03 THE ARENA + FINALS */}
      <div className="section" id="the-arena">
        <div className="arena-finals-split">
          {/* Left: Arena */}
          <div className="arena-side">
            <div className="sec-hd"><span className="sec-num">03</span><h2 className="sec-title">The Arena</h2></div>
            <p style={{fontSize: '0.68em', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '32px'}}>A single, live leaderboard across the Nordics.</p>
            <Leaderboard />
          </div>
          {/* Right: Finals */}
          <div className="finals-side">
            <div className="sec-hd"><span className="sec-num">06</span><h2 className="sec-title">Finals — Stockholm</h2></div>
            <p className="body-md">The competition starts online. It ends on stage.</p>
            <div className="finals">
              <div className="final-cell hi">
                <div className="final-lbl">Student Teams</div>
                <div className="final-num">16</div>
                <div className="final-desc">Finalist student teams compete live in Stockholm</div>
              </div>
              <div className="final-cell">
                <div className="final-lbl">Non-Student Teams</div>
                <div className="final-num">4</div>
                <div className="final-desc">Finalist non-student teams compete live in Stockholm</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UNIVERSITY LOGOS */}
      <div className="uni-logos">
        <div className="uni-logos-label">Where applicants study</div>
        <div className="uni-logos-grid">
          <div className="uni-logo-item"><img src="/logos/kth.svg" alt="KTH" /></div>
          <div className="uni-logo-item"><img src="/logos/aalto.svg" alt="Aalto University" /></div>
          <div className="uni-logo-item"><img src="/logos/dtu.svg" alt="DTU" /></div>
          <div className="uni-logo-item"><img src="/logos/chalmers.svg" alt="Chalmers" /></div>
          <div className="uni-logo-item"><img src="/logos/ntnu.png" alt="NTNU" /></div>
          <div className="uni-logo-item"><img src="/logos/lund.png" alt="Lund University" /></div>
          <div className="uni-logo-item"><img src="/logos/uppsala.png" alt="Uppsala University" /></div>
          <div className="uni-logo-item"><img src="/logos/ku.svg" alt="University of Copenhagen" /></div>
          <div className="uni-logo-item"><img src="/logos/helsinki.png" alt="University of Helsinki" /></div>
          <div className="uni-logo-item"><img src="/logos/sse.svg" alt="SSE" /></div>
        </div>
        <div className="uni-logos-note">
          Not at one of these universities — or any university? You can still apply. The competition is open to anyone across the Nordics. No degree required.
        </div>
      </div>

      {/* 05 NEW TO THIS + 08 APPLY */}
      <div className="section" id="apply">
        <div className="new-apply-split">
          <div className="new-apply-left">
            <div className="sec-hd"><span className="sec-num">05</span><h2 className="sec-title">New to This?</h2></div>
            <p className="beg-p">Most participants haven&apos;t done competitive coding before. That&apos;s not a barrier -- it&apos;s the point. You&apos;ll get everything you need to get started and iterate fast.</p>
            <div className="res-list">
              <div className="res-item"><span className="res-lbl">Provided</span>A working starter bot to get you into the arena immediately</div>
              <div className="res-item"><span className="res-lbl">Provided</span>Short interactive tutorials covering the fundamentals</div>
              <div className="res-item"><span className="res-lbl">Provided</span>Fast, real feedback on every match you compete in</div>
            </div>
            <div style={{marginTop: '40px'}}>
              <div style={{fontSize: '0.68em', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', marginBottom: '20px'}}>What actually matters</div>
              <div className="mat-list">
                <div className="mat-item"><span className="mat-arr">-&gt;</span>How fast you learn</div>
                <div className="mat-item"><span className="mat-arr">-&gt;</span>How you think under pressure</div>
                <div className="mat-item"><span className="mat-arr">-&gt;</span>How you adapt when your system loses</div>
              </div>
            </div>
          </div>
          <div className="new-apply-right">
            <div className="sec-hd"><span className="sec-num">08</span><h2 className="sec-title">Apply for Selection</h2></div>
            <ApplyForm />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="ftr">
        <span>Florent Venture Partners -- florent.vc</span>
        <span>Code League 2026</span>
      </div>

    </div>
  )
}
