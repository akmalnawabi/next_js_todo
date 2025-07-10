import Link from "next/link";
import { CalendarDemo } from "./components/calendar/page";
import TodoList from "./components/TodoList";

export default function Page() {
  const todayDate = new Date();
  return (
    <div className="flex h-full">
      <div className="flex flex-col w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">My Day</h1>
            <p className="text-sm text-gray-500">{todayDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="mr-4">
            <Link href="/components/tasks/new"
              className="bg-blue-100 text-blue-400 rounded-md p-2">+ New Task</Link>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <TodoList />
        </div>
      </div>
      <div className="bg-gray-100">
        <CalendarDemo />
      </div>
    </div>
  )
}