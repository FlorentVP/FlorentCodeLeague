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
          background: '#000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        <div style={{ fontSize: '96px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.04em', display: 'flex' }}>
          FLORENT
        </div>
        <div style={{ fontSize: '32px', color: '#FF5500', letterSpacing: '0.14em', display: 'flex' }}>
          {'<CODE LEAGUE>'}
        </div>
        <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.18em', marginTop: '8px', display: 'flex' }}>
          NORDIC PROGRAMMING CHAMPIONSHIP
        </div>
      </div>
    ),
    { ...size }
  )
}
