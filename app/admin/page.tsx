'use client'

import { useState, useEffect } from 'react'

type Application = {
  id: number
  created_at: string
  type: string
  full_name: string
  email: string
  linkedin: string
  discord: string
  hometown: string
  role: string
  company: string
  school: string
  team_name: string
}

export default function AdminPage() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<Application[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  async function login() {
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/applications', {
      headers: { Authorization: 'Basic ' + btoa(`${user}:${pass}`) },
    })
    if (res.ok) {
      setData(await res.json())
      setAuthed(true)
    } else {
      setError('Invalid credentials')
    }
    setLoading(false)
  }

  const filtered = data.filter(r =>
    [r.full_name, r.email, r.hometown, r.school, r.company, r.team_name]
      .join(' ').toLowerCase().includes(search.toLowerCase())
  )

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ width: 360, padding: '40px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}>
          <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>Admin — Florent Code League</div>
          <input
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '10px 14px', color: '#fff', fontSize: 14, marginBottom: 12, boxSizing: 'border-box' }}
            placeholder="Email"
            value={user}
            onChange={e => setUser(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
          />
          <input
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '10px 14px', color: '#fff', fontSize: 14, marginBottom: 20, boxSizing: 'border-box' }}
            placeholder="Password"
            type="password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
          />
          {error && <div style={{ color: '#ff5555', fontSize: 13, marginBottom: 16 }}>{error}</div>}
          <button
            onClick={login}
            disabled={loading}
            style={{ width: '100%', background: '#fff', color: '#000', border: 'none', borderRadius: 4, padding: '10px 14px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'sans-serif', padding: '40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>Florent Code League</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>Applications <span style={{ color: '#FF5500' }}>{data.length}</span></div>
          </div>
          <input
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '8px 14px', color: '#fff', fontSize: 14, width: 240 }}
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500 }}>Date</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500 }}>Name</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500 }}>Email</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500 }}>Role</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500 }}>Location</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500 }}>School / Company</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500 }}>Type</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500 }}>LinkedIn</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '10px 12px', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{new Date(r.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 500 }}>{r.full_name}</td>
                  <td style={{ padding: '10px 12px', color: 'rgba(255,255,255,0.7)' }}>{r.email}</td>
                  <td style={{ padding: '10px 12px', color: 'rgba(255,255,255,0.6)' }}>{r.role || '—'}</td>
                  <td style={{ padding: '10px 12px', color: 'rgba(255,255,255,0.6)' }}>{r.hometown || '—'}</td>
                  <td style={{ padding: '10px 12px', color: 'rgba(255,255,255,0.6)' }}>{r.school || r.company || '—'}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: r.type === 'team' ? 'rgba(255,85,0,0.15)' : 'rgba(255,255,255,0.08)', color: r.type === 'team' ? '#FF5500' : 'rgba(255,255,255,0.6)' }}>
                      {r.type}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    {r.linkedin ? <a href={r.linkedin.startsWith('http') ? r.linkedin : `https://${r.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: '#FF5500', textDecoration: 'none' }}>↗</a> : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
