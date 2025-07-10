'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/outline';

interface Todo {
    id: string;
    title: string;
    date: string;
    category: string;
    isCompleted: boolean;
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch('/api/todos');
            if (response.ok) {
                const data = await response.json();
                setTodos(data);
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleComplete = async (id: string, isCompleted: boolean) => {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isCompleted: !isCompleted }),
            });

            if (response.ok) {
                setTodos(todos.map(todo =>
                    todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
                ));
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    if (loading) {
        return <div className="text-center py-4">Loading tasks...</div>;
    }

    if (todos.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <p>No tasks yet. Create your first task!</p>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            {todos.map((todo) => (
                <div
                    key={todo.id}
                    className={`flex items-center justify-between shadow-sm ${todo.isCompleted ? 'opacity-90' : ''
                        }`}
                >
                    <div className="flex items-center space-x-1 flex-1">
                        <input
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={() => toggleComplete(todo.id, todo.isCompleted)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <Link
                            href={`/components/tasks/${todo.id}`}
                            className="flex-1 hover:bg-gray-50 p-2 rounded transition-colors"
                        >
                            <div>
                                <h3 className={`font-medium ${todo.isCompleted ? ' text-gray-900' : 'text-gray-900'}`}>
                                    {todo.title}
                                </h3>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className={`px-2 py-1 text-xs text-gray-500 rounded-full ${todo.category}`}>
                                        {todo.category}
                                    </span>
                                    <span className="text-sm text-blue-400">
                                        {new Date(todo.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </span>                      
                                </div>
                            </div>
                        </Link>
                    </div>
                   
                    <StarIcon width={28} height={28} className='text-blue-500 ml-2 p-2' />
                </div>
            ))}
        </div>
    );
} 