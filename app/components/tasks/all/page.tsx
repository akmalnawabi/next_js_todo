"use client"

import { useState, useEffect } from 'react'

interface Todo {
    id: string
    title: string
    date: string
    category: string
    isCompleted: boolean
}

export default function AllTasksPage() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAllTasks()
    }, [])

    const fetchAllTasks = async () => {
        try {
            const response = await fetch('/api/todos')
            if (response.ok) {
                const data = await response.json()
                setTodos(data)
            }
        } catch (error) {
            console.error('Error fetching all tasks:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">All Tasks</h1>
            {loading ? (
                <p>Loading tasks...</p>
            ) : todos.length === 0 ? (
                <p className="text-gray-500">No tasks found</p>
            ) : (
                <div className="space-y-2">
                    {todos.map((todo) => (
                        <div key={todo.id} className="p-3 border rounded-lg">
                            <h3 className="font-medium">{todo.title}</h3>
                            <p className="text-sm text-gray-500">{todo.category}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
} 