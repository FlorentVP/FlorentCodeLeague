'use client'

import { useEffect, useState } from 'react'

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
          <span className="t-item">KTH --</span><span className="t-item">Aalto --</span><span className="t-item">DTU --</span><span className="t-item">Chalmers --</span><span className="t-item">NTNU --</span><span className="t-item">Lund --</span><span className="t-item">Uppsala --</span><span className="t-item">Copenhagen --</span><span className="t-item">Helsinki --</span><span className="t-item">SSE --</span><span className="t-item">Stockholm Finals --</span><span className="t-item">100,000 SEK Prize --</span><span className="t-item">KTH --</span><span className="t-item">Aalto --</span><span className="t-item">DTU --</span><span className="t-item">Chalmers --</span><span className="t-item">NTNU --</span><span className="t-item">Lund --</span><span className="t-item">Uppsala --</span><span className="t-item">Copenhagen --</span><span className="t-item">Helsinki --</span><span className="t-item">SSE --</span><span className="t-item">Stockholm Finals --</span><span className="t-item">100,000 SEK Prize --</span>
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="hero-eyebrow">Launching August 2026 -- Applications Open Now</div>
        <h1 className="hero-title">Florent<br /><em>Code League</em></h1>
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
          <div className="meta-item"><span className="meta-lbl">Open to</span><span className="meta-val">Students across the Nordics</span></div>
          <div className="meta-item"><span className="meta-lbl">Experience</span><span className="meta-val">Not required. Fast learning is.</span></div>
        </div>
        <a href="#apply" className="btn-white">Apply for Selection</a>
        <a href="#how-it-works" className="btn-ghost">How it works</a>
      </div>

      {/* STATS */}
      <div className="stats-row">
        <div className="stat-box"><div className="stat-num">4%</div><div className="stat-desc">of Europe&apos;s population</div></div>
        <div className="stat-box"><div className="stat-num">15%</div><div className="stat-desc">of Europe&apos;s unicorns</div></div>
        <div className="stat-box"><div className="stat-num"><em>Top tier</em></div><div className="stat-desc">AI talent density on par with the US</div></div>
      </div>

      {/* 01 WHAT YOU BUILD */}
      <div className="section">
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

      {/* 02 HOW IT WORKS */}
      <div className="section" id="how-it-works">
        <div className="sec-hd"><span className="sec-num">02</span><h2 className="sec-title">How It Works</h2></div>
        <div className="steps">
          <div className="step"><span className="step-n">01</span><span className="step-c">Apply and get selected by Florent</span></div>
          <div className="step"><span className="step-n">02</span><span className="step-c">Build your system using starter bot and tutorials</span></div>
          <div className="step"><span className="step-n">03</span><span className="step-c">Compete on the live Nordic ladder</span></div>
          <div className="step"><span className="step-n">04</span><span className="step-c">Improve daily and climb the rankings over 3 weeks</span></div>
          <div className="step"><span className="step-n">05</span><span className="step-c">Top 32 teams qualify for the Stockholm finals</span></div>
        </div>
      </div>

      {/* 03 THE ARENA */}
      <div className="section">
        <div className="sec-hd"><span className="sec-num">03</span><h2 className="sec-title">The Arena</h2></div>
        <p style={{fontSize: '0.68em', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '32px'}}>A single, live leaderboard across the Nordics. Compete as individuals and as universities.</p>
        <div className="cities">
          <div className="city"><div className="city-name">Stockholm</div><div className="city-unis">KTH<br />SSE</div></div>
          <div className="city"><div className="city-name">Helsinki</div><div className="city-unis">Aalto<br />Univ. of Helsinki</div></div>
          <div className="city"><div className="city-name">Copenhagen</div><div className="city-unis">DTU<br />Univ. of Copenhagen</div></div>
          <div className="city"><div className="city-name">Gothenburg</div><div className="city-unis">Chalmers</div></div>
          <div className="city"><div className="city-name">Trondheim</div><div className="city-unis">NTNU</div></div>
          <div className="city"><div className="city-name">Lund + Uppsala</div><div className="city-unis">Lund University<br />Uppsala University</div></div>
        </div>
      </div>

      {/* 04 WHY JOIN */}
      <div className="section">
        <div className="sec-hd"><span className="sec-num">04</span><h2 className="sec-title">Why Join</h2></div>
        <div className="prize-box">
          <div className="prize-amt">€10K</div>
          <p className="prize-lbl">Cash prize to the winning team. Compete against the strongest technical talent in the Nordics.</p>
        </div>
        <div className="perks">
          <div className="perk"><span className="perk-dash">--</span><p className="perk-txt">Named to the Florent Nordic Top 10 Programmers list</p></div>
          <div className="perk"><span className="perk-dash">--</span><p className="perk-txt">Direct exposure to top global firms and investors</p></div>
          <div className="perk"><span className="perk-dash">--</span><p className="perk-txt">Top 32 teams qualify for Stockholm finals</p></div>
          <div className="perk"><span className="perk-dash">--</span><p className="perk-txt">Student finalists flown to Stockholm</p></div>
        </div>
      </div>

      {/* 05 NEW TO THIS */}
      <div className="section">
        <div className="sec-hd"><span className="sec-num">05</span><h2 className="sec-title">New to This?</h2></div>
        <div className="beg-grid">
          <div>
            <p className="beg-p">Most participants haven&apos;t done competitive coding before. That&apos;s not a barrier -- it&apos;s the point. You&apos;ll get everything you need to get started and iterate fast.</p>
            <div className="res-list">
              <div className="res-item"><span className="res-lbl">Provided</span>A working starter bot to get you into the arena immediately</div>
              <div className="res-item"><span className="res-lbl">Provided</span>Short interactive tutorials covering the fundamentals</div>
              <div className="res-item"><span className="res-lbl">Provided</span>Fast, real feedback on every match you compete in</div>
            </div>
          </div>
          <div>
            <div style={{fontSize: '0.68em', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', marginBottom: '20px'}}>What actually matters</div>
            <div className="mat-list">
              <div className="mat-item"><span className="mat-arr">-&gt;</span>How fast you learn</div>
              <div className="mat-item"><span className="mat-arr">-&gt;</span>How you think under pressure</div>
              <div className="mat-item"><span className="mat-arr">-&gt;</span>How you adapt when your system loses</div>
            </div>
          </div>
        </div>
      </div>

      {/* 06 FINALS */}
      <div className="section">
        <div className="sec-hd"><span className="sec-num">06</span><h2 className="sec-title">Finals -- Stockholm</h2></div>
        <p className="body-md">The competition starts online. It ends on stage.</p>
        <div className="finals">
          <div className="final-cell hi"><div className="final-lbl">Elite Bracket</div><div className="final-desc">Top 8 -- main stage with live audience and real-time visualisation</div></div>
          <div className="final-cell"><div className="final-lbl">Challenger Bracket</div><div className="final-desc">Top 32 -- live competition at the Stockholm venue</div></div>
        </div>
      </div>

      {/* 07 TIMELINE */}
      <div className="section">
        <div className="sec-hd"><span className="sec-num">07</span><h2 className="sec-title">Timeline</h2></div>
        <div className="tl">
          <div className="tl-item"><div className="tl-date">Now</div><div className="tl-evt">Applications open</div></div>
          <div className="tl-item"><div className="tl-date">July 2026</div><div className="tl-evt">Selection decisions sent</div></div>
          <div className="tl-item"><div className="tl-date">August 2026</div><div className="tl-evt">3-week online competition</div></div>
          <div className="tl-item"><div className="tl-date">Late August</div><div className="tl-evt">Live finals, Stockholm</div></div>
        </div>
      </div>

      {/* LIMITED ACCESS */}
      <div className="section" id="apply">
        <div className="limited">
          <div>
            <div style={{fontSize: '0.68em', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', marginBottom: '20px'}}>Limited Access</div>
            <p className="lim-txt"><strong>We accept a limited number of teams.</strong><br /><br />If you&apos;re strong -- you&apos;ll get in.<br />If you&apos;re not -- you won&apos;t.<br /><br />Applications reviewed by Florent.</p>
          </div>
          <a href="#" className="btn-white" style={{whiteSpace: 'nowrap'}}>Apply for Selection</a>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="final-cta">
        <h2 className="fcta-title">Where do<br />you <em>stand?</em></h2>
        <div className="fcta-sub">3 weeks -- one leaderboard -- Stockholm finals</div>
        <a href="#" className="btn-white">Apply for Selection</a>
      </div>

      {/* FOOTER */}
      <div className="ftr">
        <span>Florent Venture Partners -- florent.vc</span>
        <span>Code League 2026</span>
      </div>

    </div>
  )
}
