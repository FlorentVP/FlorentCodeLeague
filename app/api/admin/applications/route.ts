import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_USER = 'christian@florent.vc'
const ADMIN_PASS = 'lilly'

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization') || ''
  const [user, pass] = Buffer.from(auth.replace('Basic ', ''), 'base64').toString().split(':')
  if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sql = neon(process.env.POSTGRES_URL!)
  const rows = await sql`
    SELECT id, created_at, type, full_name, email, linkedin, discord, hometown, role, company, school, team_name
    FROM applications
    ORDER BY created_at DESC
  `
  return NextResponse.json(rows)
}
