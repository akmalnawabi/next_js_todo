'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Todo {
    id: string;
    title: string;
    date: string;
    category: string;
    isCompleted: boolean;
}

export default function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [todo, setTodo] = useState<Todo | null>(null);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState<string>('');

    useEffect(() => {
        const getParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };
        getParams();
    }, [params]);

    useEffect(() => {
        if (id) {
            fetchTodo();
        }
    }, [id]);

    const fetchTodo = async () => {
        try {
            const response = await fetch(`/api/todos/${id}`);
            if (response.ok) {
                const data = await response.json();
                setTodo(data);
            } else {
                console.error('Failed to fetch todo');
            }
        } catch (error) {
            console.error('Error fetching todo:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this task?')) {
            try {
                const response = await fetch(`/api/todos/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    router.push('/');
                } else {
                    console.error('Failed to delete todo');
                }
            } catch (error) {
                console.error('Error deleting todo:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">Loading task...</div>
            </div>
        );
    }

    if (!todo) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Task not found</h1>
                    <Link href="/" className="text-blue-600 hover:text-blue-800">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Task Details</h1>
                    <Link
                        href="/"
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </Link>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">{todo.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Due: {new Date(todo.date).toLocaleDateString()}
                        </p>
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 mt-2">
                            {todo.category}
                        </span>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={todo.isCompleted}
                            disabled
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                            {todo.isCompleted ? 'Completed' : 'Not completed'}
                        </span>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <Link
                            href={`/components/tasks/${id}/edit`}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-center"
                        >
                            Edit Task
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                        >
                            Delete Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 