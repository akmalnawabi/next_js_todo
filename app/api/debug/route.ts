import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET() {
  try {
    console.log('Debug endpoint - Testing database connection')
    
    // Test 1: Check if DATABASE_URL is set
    const hasDatabaseUrl = !!process.env.DATABASE_URL
    console.log('DATABASE_URL exists:', hasDatabaseUrl)
    
    // Test 2: Try to connect to database
    await prisma.$connect()
    console.log('Database connection successful')
    
    // Test 3: Check if Todo table exists
    const tableExists = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'Todo'
      );
    `
    console.log('Todo table exists:', tableExists)
    
    // Test 4: Try to count todos
    const todoCount = await prisma.todo.count()
    console.log('Current todo count:', todoCount)
    
    // Test 5: Check Prisma client status
    const clientStatus = await prisma.$queryRaw`SELECT 1 as test`
    console.log('Prisma client working:', !!clientStatus)
    
    return NextResponse.json({
      status: 'success',
      databaseUrl: hasDatabaseUrl,
      connection: 'successful',
      tableExists: tableExists,
      todoCount: todoCount,
      clientStatus: 'working',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Debug endpoint error:', error)
    
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
} 