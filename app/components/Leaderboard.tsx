'use client'

import { useEffect, useState } from 'react'

const TEAMS: Record<string, { name: string; flag: string; school: string }> = {
  a: { name: '0xDEADBEEF',      flag: '🇸🇪', school: 'KTH' },
  b: { name: 'segfault.exe',    flag: '🇫🇮', school: 'Aalto' },
  c: { name: 'NullPtr',         flag: '🇩🇰', school: 'DTU' },
  d: { name: 'git blame --hard',flag: '🇳🇴', school: 'NTNU' },
  e: { name: 'rm -rf /*',       flag: '🇸🇪', school: 'None / Dropout' },
  f: { name: 'O(1) or bust',    flag: '🇫🇮', school: 'None / Dropout' },
  g: { name: 'undefined.js',    flag: '🇩🇰', school: 'Copenhagen' },
  h: { name: 'heap_overflow',   flag: '🇸🇪', school: 'Chalmers' },
}

// Each snapshot: [teamId, score][] ordered by rank
const SNAPSHOTS: [string, number][][] = [
  [['a',2847],['b',2831],['c',2819],['d',2756],['e',2701],['f',2688],['g',2644],['h',2601]],
  [['c',2863],['b',2849],['a',2847],['d',2760],['f',2710],['e',2701],['g',2651],['h',2608]],
  [['b',2878],['c',2866],['a',2857],['d',2768],['f',2718],['e',2703],['h',2621],['g',2651]],
  [['a',2891],['c',2880],['b',2873],['d',2775],['e',2724],['f',2715],['g',2662],['h',2625]],
]

export default function Leaderboard() {
  const [idx, setIdx] = useState(0)
  const [prevIdx, setPrevIdx] = useState(0)
  const [showDeltas, setShowDeltas] = useState(false)
  const [secondsAgo, setSecondsAgo] = useState(0)

  useEffect(() => {
    const rankInterval = setInterval(() => {
      setIdx(i => {
        const next = (i + 1) % SNAPSHOTS.length
        setPrevIdx(i)
        setShowDeltas(true)
        setSecondsAgo(0)
        setTimeout(() => setShowDeltas(false), 2000)
        return next
      })
    }, 3200)
    const tickInterval = setInterval(() => setSecondsAgo(s => s + 1), 1000)
    return () => { clearInterval(rankInterval); clearInterval(tickInterval) }
  }, [])

  const current = SNAPSHOTS[idx]
  const prevOrder = SNAPSHOTS[prevIdx].map(([id]) => id)

  return (
    <div className="lb">
      <div className="lb-header">
        <span className="lb-live-dot" />
        <span className="lb-live-label">Live Rankings</span>
        <span className="lb-updated">{secondsAgo}s ago</span>
      </div>
      <div className="lb-cols">
        <span>#</span>
        <span>Team</span>
        <span></span>
        <span>University</span>
        <span>Pts</span>
      </div>
      {current.map(([id, score], i) => {
        const team = TEAMS[id]
        const prevRank = prevOrder.indexOf(id)
        const delta = showDeltas && prevRank !== -1 ? prevRank - i : 0
        const rowClass = [
          'lb-row',
          i === 0 ? 'lb-row--first' : '',
          delta !== 0 ? 'lb-row--changed' : '',
        ].filter(Boolean).join(' ')

        return (
          <div key={id} className={rowClass}>
            <div className="lb-rank">{i + 1}</div>
            <div className="lb-name">{team.name}</div>
            <div className="lb-flag">{team.flag}</div>
            <div className="lb-school">{team.school}</div>
            <div className="lb-score-cell">
              <span className="lb-score">{score.toLocaleString()}</span>
              {delta !== 0 && (
                <span className={`lb-delta ${delta > 0 ? 'lb-up' : 'lb-down'}`}>
                  {delta > 0 ? `↑${delta}` : `↓${Math.abs(delta)}`}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
