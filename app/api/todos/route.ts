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
    const { title, date, category, isCompleted } = body

    if (!title || !date || !category) {
      return NextResponse.json(
        { error: 'Title, date, and category are required' },
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
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 })
  }
}