import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { date: 'desc' }
    })
    return NextResponse.json(todos)
  } catch (error) {
    console.error('Error fetching todos:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch todos'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/todos - Starting request processing')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const { title, date, category, isCompleted } = body

    if (!title || !date || !category) {
      console.log('Validation failed - missing required fields')
      return NextResponse.json(
        { error: 'Title, date, and category are required' },
        { status: 400 }
      )
    }

    console.log('Creating todo with data:', { title, date, category, isCompleted })

    const newTodo = await prisma.todo.create({
      data: {
        title,
        date: new Date(date),
        category,
        isCompleted: isCompleted || false
      }
    })

    console.log('Todo created successfully:', newTodo)
    return NextResponse.json(newTodo, { status: 201 })
    
  } catch (error) {
    console.error('Error creating todo - Full error:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    // Check if it's a Prisma error
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('Prisma error code:', (error as any).code)
    }
    
    return NextResponse.json({ 
      error: 'Failed to create todo',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}