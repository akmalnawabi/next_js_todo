import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET() {
  const prisma = new PrismaClient()
  
  try {
    console.log('Testing database connection...')
    
    // Test connection
    await prisma.$connect()
    console.log('Database connected successfully')
    
    // Test if the Todo table exists by trying to count
    const count = await prisma.todo.count()
    console.log(`Todo table exists, count: ${count}`)
    
    // Test if we can create a test record
    const testTodo = await prisma.todo.create({
      data: {
        title: 'Test Task',
        date: new Date(),
        category: 'test',
        isCompleted: false
      }
    })
    console.log('Test todo created:', testTodo.id)
    
    // Clean up - delete the test record
    await prisma.todo.delete({
      where: { id: testTodo.id }
    })
    console.log('Test todo deleted')
    
    return NextResponse.json({ 
      status: 'success',
      message: 'Database connection and operations working correctly',
      todoCount: count
    })
    
  } catch (error) {
    console.error('Database test failed:', error)
    return NextResponse.json({ 
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
} 