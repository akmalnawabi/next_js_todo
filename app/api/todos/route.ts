import { NextRequest, NextResponse } from 'next/server'
import { memoryStore } from '@/app/lib/memory-store'

export async function GET() {
  try {
    console.log('GET /api/todos - Attempting to fetch todos')
    
    // For now, just use memory store to avoid database issues
    const todos = await memoryStore.getAllTodos()
    console.log(`Successfully fetched ${todos.length} todos from memory store`)
    return NextResponse.json(todos)
    
  } catch (error) {
    console.error('Error fetching todos:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch todos', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
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

    // For now, just use memory store to avoid database issues
    const todo = await memoryStore.createTodo({
      title,
      date: new Date(date),
      category,
      isCompleted: isCompleted || false
    })
    console.log('Todo created in memory store:', todo.id)
    return NextResponse.json(todo, { status: 201 })
    
  } catch (error) {
    console.error('Error creating todo:', error)
    return NextResponse.json({ 
      error: 'Failed to create todo', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}