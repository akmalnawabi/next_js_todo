import Link from 'next/link';

export default function TasksIndexPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Tasks Overview</h1>
            <p className="mb-6 text-gray-600">Welcome! Select a category below to view your tasks.</p>
            <ul className="space-y-2">
                <li>
                    <Link href="/components/tasks/my-day" className="text-blue-600 hover:underline">My Day</Link>
                </li>
                <li>
                    <Link href="/components/tasks/important" className="text-blue-600 hover:underline">Important</Link>
                </li>
                <li>
                    <Link href="/components/tasks/personal" className="text-blue-600 hover:underline">Personal</Link>
                </li>
                <li>
                    <Link href="/components/tasks/all" className="text-blue-600 hover:underline">All Tasks</Link>
                </li>
                <li>
                    <Link href="/components/tasks/completed" className="text-blue-600 hover:underline">Completed</Link>
                </li>
                <li>
                    <Link href="/components/tasks/assigned" className="text-blue-600 hover:underline">Assigned to Me</Link>
                </li>
            </ul>
        </div>
    );
} 