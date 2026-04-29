import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')

  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const sql = neon(process.env.POSTGRES_URL!)
    const rows = await sql`SELECT * FROM applications ORDER BY created_at DESC`
    return NextResponse.json({ count: rows.length, applications: rows })
  } catch (err) {
    console.error('Admin error:', err)
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
  }
}
