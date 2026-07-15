import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'
export const alt = 'Florent Code League 2026'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
        }}
      >
        <img
          src="https://league.florent.vc/bot-king.png"
          width={160}
          height={160}
          style={{ objectFit: 'contain' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '80px', fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>
            FLORENT
          </div>
          <div style={{ fontSize: '28px', color: '#FF5500', letterSpacing: '0.12em' }}>
            {'<CODE LEAGUE>'}
          </div>
        </div>
        <div style={{ fontSize: '22px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>
          NORDIC PROGRAMMING CHAMPIONSHIP
        </div>
      </div>
    ),
    { ...size }
  )
}
