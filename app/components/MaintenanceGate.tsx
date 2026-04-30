'use client'

import { useState, useEffect } from 'react'

const CORRECT_USER = 'florent'
const CORRECT_PASS = 'league2026'
const STORAGE_KEY = 'fcl_auth'

export default function MaintenanceGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false)
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') {
      setUnlocked(true)
    }
    setReady(true)
  }, [])

  function attempt(e: React.FormEvent) {
    e.preventDefault()
    if (user.trim().toLowerCase() === CORRECT_USER && pass === CORRECT_PASS) {
      sessionStorage.setItem(STORAGE_KEY, '1')
      setUnlocked(true)
    } else {
      setError(true)
      setPass('')
    }
  }

  if (!ready) return null

  if (unlocked) return <>{children}</>

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#0a0a0a',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif', zIndex: 9999,
    }}>
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <div style={{ fontSize: 13, letterSpacing: '0.15em', color: '#FF5500', textTransform: 'uppercase', marginBottom: 8 }}>
          Under Maintenance
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
          Florent Code League
        </div>
        <div style={{ fontSize: 14, color: '#666', marginTop: 8 }}>
          We're putting the finishing touches on something big.
        </div>
      </div>

      <form onSubmit={attempt} style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={e => { setUser(e.target.value); setError(false) }}
          autoComplete="username"
          style={{
            background: '#1a1a1a', border: `1px solid ${error ? '#FF5500' : '#333'}`,
            borderRadius: 6, padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={e => { setPass(e.target.value); setError(false) }}
          autoComplete="current-password"
          style={{
            background: '#1a1a1a', border: `1px solid ${error ? '#FF5500' : '#333'}`,
            borderRadius: 6, padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none',
          }}
        />
        {error && (
          <div style={{ fontSize: 12, color: '#FF5500', textAlign: 'center' }}>
            Incorrect credentials
          </div>
        )}
        <button type="submit" style={{
          background: '#FF5500', border: 'none', borderRadius: 6,
          padding: '11px 14px', color: '#fff', fontSize: 14, fontWeight: 600,
          cursor: 'pointer', marginTop: 4,
        }}>
          Enter
        </button>
      </form>
    </div>
  )
}
