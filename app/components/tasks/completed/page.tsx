"use client"

import { useState, useEffect } from 'react'

interface Todo {
    id: string
    title: string
    date: string
    category: string
    isCompleted: boolean
}

export default function CompletedTasksPage() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCompletedTasks()
    }, [])

    const fetchCompletedTasks = async () => {
        try {
            const response = await fetch('/api/todos')
            if (response.ok) {
                const data = await response.json()
                const completedTasks = data.filter((todo: Todo) => todo.isCompleted)
                setTodos(completedTasks)
            }
        } catch (error) {
            console.error('Error fetching completed tasks:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Completed Tasks</h1>
            {loading ? (
                <p>Loading tasks...</p>
            ) : todos.length === 0 ? (
                <p className="text-gray-500">No completed tasks</p>
            ) : (
                <div className="space-y-2">
                    {todos.map((todo) => (
                        <div key={todo.id} className="p-3 border rounded-lg bg-green-50">
                            <h3 className="font-medium line-through text-green-700">{todo.title}</h3>
                            <p className="text-sm text-gray-500">{todo.category}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
} 