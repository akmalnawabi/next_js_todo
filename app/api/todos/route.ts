import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage
let todos = [];

let nextId = 1;

export async function GET() {
  return NextResponse.json(todos)
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

    const newTodo = {
      id: nextId.toString(),
      title,
      date: new Date(date).toISOString(),
      category,
      isCompleted: isCompleted || false
    };

    todos.push(newTodo);
    nextId++;

    return NextResponse.json(newTodo, { status: 201 })
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to create todo'
    }, { status: 500 })
  }
}