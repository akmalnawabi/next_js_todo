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

interface EditTaskClientProps {
    taskId: string;
}

function EditTaskClient({ taskId }: EditTaskClientProps) {
    const router = useRouter();
    const [todo, setTodo] = useState<Todo | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        category: '',
        isCompleted: false
    });

    useEffect(() => {
        fetchTodo();
    }, [taskId]);

    const fetchTodo = async () => {
        try {
            const response = await fetch(`/api/todos/${taskId}`);
            if (response.ok) {
                const data = await response.json();
                setTodo(data);
                setFormData({
                    title: data.title,
                    date: data.date.split('T')[0], // Convert to date-only format
                    category: data.category,
                    isCompleted: data.isCompleted
                });
            } else {
                console.error('Failed to fetch todo');
            }
        } catch (error) {
            console.error('Error fetching todo:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch(`/api/todos/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    date: new Date(formData.date).toISOString(),
                }),
            });

            if (response.ok) {
                // Redirect to the task detail page
                router.push(`/components/tasks/${taskId}`);
            } else {
                console.error('Failed to update todo');
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
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
                    <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
                    <Link
                        href={`/components/tasks/${taskId}`}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Task Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter task title"
                        />
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                            Due Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="important">Important</option>
                            <option value="personal">Personal</option>
                            <option value="assigned to me">Assigned to me</option>
                            <option value="go pay">Go pay</option>
                            <option value="kretrya studio">Kretrya Studio</option>
                            <option value="content dump">Content Dump</option>
                        </select>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isCompleted"
                            name="isCompleted"
                            checked={formData.isCompleted}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isCompleted" className="ml-2 block text-sm text-gray-900">
                            Mark as completed
                        </label>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <Link
                            href={`/components/tasks/${taskId}`}
                            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 text-center"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default async function EditTaskPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <EditTaskClient taskId={id} />;
}
