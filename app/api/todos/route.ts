import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        date: 'asc'
      }
    })
    return NextResponse.json(todos)
  } catch (error) {
    console.error('Error fetching todos:', error)
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received request body:', body)
    const { title, date, category, isCompleted } = body

    console.log('Extracted values:', { title, date, category, isCompleted })

    if (!title || !date || !category) {
      console.log('Validation failed:', { title: !!title, date: !!date, category: !!category })
      return NextResponse.json(
        { error: 'Title, date, and category are required', received: { title, date, category } },
        { status: 400 }
      )
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        date: new Date(date),
        category,
        isCompleted: isCompleted || false
      }
    })

    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    console.error('Error creating todo:', error)
    return NextResponse.json({ 
      error: 'Failed to create todo', 
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined
    }, { status: 500 })
  }
}