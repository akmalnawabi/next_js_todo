import { NextResponse } from 'next/server'

export async function GET() {
  const hasDatabaseUrl = !!process.env.DATABASE_URL
  const databaseUrlLength = process.env.DATABASE_URL?.length || 0
  
  return NextResponse.json({
    hasDatabaseUrl,
    databaseUrlLength,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  })
} 