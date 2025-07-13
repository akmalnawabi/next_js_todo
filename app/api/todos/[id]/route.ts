import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { memoryStore } from '@/app/lib/memory-store'

// GET single todo
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Try database first
    try {
      await prisma.$connect()
      const todo = await prisma.todo.findUnique({
        where: { id }
      })

      if (todo) {
        return NextResponse.json(todo)
      }
    } catch (dbError) {
      console.log('Database connection failed, trying memory store:', dbError)
    }

    // Fallback to memory store
    const todo = await memoryStore.getTodoById(id)
    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(todo)
  } catch (error) {
    console.error('Error fetching todo:', error)
    return NextResponse.json(
      { error: 'Failed to fetch todo' },
      { status: 500 }
    )
  } finally {
    try {
      await prisma.$disconnect()
    } catch (e) {
      // Ignore disconnect errors
    }
  }
}

// PUT update todo (full update)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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

    // Try database first
    try {
      await prisma.$connect()
      const todo = await prisma.todo.update({
        where: { id },
        data: {
          title,
          date: new Date(date),
          category,
          isCompleted: isCompleted || false
        }
      })
      return NextResponse.json(todo)
    } catch (dbError) {
      console.log('Database update failed, trying memory store:', dbError)
      
      // Fallback to memory store
      const todo = await memoryStore.updateTodo(id, {
        title,
        date: new Date(date),
        category,
        isCompleted: isCompleted || false
      })
      
      if (!todo) {
        return NextResponse.json(
          { error: 'Todo not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json(todo)
    }
  } catch (error) {
    console.error('Error updating todo:', error)
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    )
  } finally {
    try {
      await prisma.$disconnect()
    } catch (e) {
      // Ignore disconnect errors
    }
  }
}

// PATCH update todo (partial update)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { isCompleted } = body

    // Try database first
    try {
      await prisma.$connect()
      const todo = await prisma.todo.update({
        where: { id },
        data: { isCompleted }
      })
      return NextResponse.json(todo)
    } catch (dbError) {
      console.log('Database patch failed, trying memory store:', dbError)
      
      // Fallback to memory store
      const todo = await memoryStore.updateTodo(id, { isCompleted })
      
      if (!todo) {
        return NextResponse.json(
          { error: 'Todo not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json(todo)
    }
  } catch (error) {
    console.error('Error updating todo:', error)
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    )
  } finally {
    try {
      await prisma.$disconnect()
    } catch (e) {
      // Ignore disconnect errors
    }
  }
}

// DELETE todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Try database first
    try {
      await prisma.$connect()
      await prisma.todo.delete({
        where: { id }
      })
      return NextResponse.json({ message: 'Todo deleted successfully' })
    } catch (dbError) {
      console.log('Database delete failed, trying memory store:', dbError)
      
      // Fallback to memory store
      const deleted = await memoryStore.deleteTodo(id)
      
      if (!deleted) {
        return NextResponse.json(
          { error: 'Todo not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({ message: 'Todo deleted successfully' })
    }
  } catch (error) {
    console.error('Error deleting todo:', error)
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    )
  } finally {
    try {
      await prisma.$disconnect()
    } catch (e) {
      // Ignore disconnect errors
    }
  }
}

