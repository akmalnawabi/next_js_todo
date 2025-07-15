import { NextRequest, NextResponse } from 'next/server'

interface Todo {
  id: string;
  title: string;
  date: string;
  category: string;
  isCompleted: boolean;
}

// Simple in-memory storage (same as in route.ts)
let todos: Todo[] = [];

// GET single todo
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const todo = todos.find(t => t.id === id)
  
  if (!todo) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(todo)
}

// PUT update todo (full update)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const { title, date, category, isCompleted } = body

  // Validate required fields
  if (!title || !date || !category) {
    return NextResponse.json(
      { error: 'Title, date, and category are required' },
      { status: 400 }
    )
  }

  const todoIndex = todos.findIndex(t => t.id === id)
  if (todoIndex === -1) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    )
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    title,
    date: new Date(date).toISOString(),
    category,
    isCompleted: isCompleted || false
  }

  return NextResponse.json(todos[todoIndex])
}

// PATCH update todo (partial update)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const { isCompleted } = body

  const todoIndex = todos.findIndex(t => t.id === id)
  if (todoIndex === -1) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    )
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    isCompleted
  }

  return NextResponse.json(todos[todoIndex])
}

// DELETE todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const todoIndex = todos.findIndex(t => t.id === id)
  if (todoIndex === -1) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 500 }
    )
  }

  todos.splice(todoIndex, 1)
  return NextResponse.json({ message: 'Todo deleted successfully' })
}

