import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const sql = neon(process.env.POSTGRES_URL!)
    const body = await req.json()

    await sql`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        type VARCHAR(10) NOT NULL,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        linkedin TEXT NOT NULL,
        discord TEXT,
        hometown TEXT NOT NULL,
        company TEXT,
        team_name TEXT,
        teammates JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    await sql`
      INSERT INTO applications (type, full_name, email, linkedin, discord, hometown, company, team_name, teammates)
      VALUES (
        ${body.type},
        ${body.primary.fullName},
        ${body.primary.email},
        ${body.primary.linkedin},
        ${body.primary.discord || null},
        ${body.primary.hometown},
        ${body.primary.company || null},
        ${body.teamName || null},
        ${body.teammates?.length ? JSON.stringify(body.teammates) : null}
      )
    `

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Apply error:', err)
    return NextResponse.json({ error: 'Failed to save application' }, { status: 500 })
  }
}
