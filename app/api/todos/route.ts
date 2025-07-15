import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage
let todos = [];

let nextId = 1;

export async function GET() {
  try {
    console.log('GET /api/todos - Returning todos')
    return NextResponse.json(todos)
  } catch (error) {
    console.error('Error in GET /api/todos:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch todos', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('POST /api/todos - Received body:', body)
    
    const { title, date, category, isCompleted } = body

    if (!title || !date || !category) {
      console.log('Validation failed:', { title: !!title, date: !!date, category: !!category })
      return NextResponse.json(
        { error: 'Title, date, and category are required', received: { title, date, category } },
        { status: 400 }
      )
    }

    const newTodo = {
      id: nextId.toString(),
      title,
      date: new Date(date).toISOString(),
      category,
      isCompleted: isCompleted || false
    };

    todos.push(newTodo);
    nextId++;

    console.log('Todo created:', newTodo.id)
    return NextResponse.json(newTodo, { status: 201 })
    
  } catch (error) {
    console.error('Error in POST /api/todos:', error)
    return NextResponse.json({ 
      error: 'Failed to create todo', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}