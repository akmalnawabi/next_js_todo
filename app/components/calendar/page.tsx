"use client"

import * as React from "react"

import { Calendar } from "../ui/calendar"
import { UserCircleIcon, BellIcon, Cog6ToothIcon, CheckIcon } from "@heroicons/react/24/outline"
import { useCompletedTasks } from "@/app/hooks/useCompletedTasks"

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const { completedTasks, loading } = useCompletedTasks()

  return (
    <div className="">
      <div className="flex gap-8 items-center mb-2">
        <div className="flex gap-1 items-center">
          <div className="text-blue-500"><UserCircleIcon width={36} /></div>
          <div className="text-sm">
            <h2 className="font-semibold">Alvin Alwire</h2>
            <p className="text-[12px]">akmal@gmail</p>
          </div>
        </div>
        <div className="flex gap-4 text-blue-500">
          <BellIcon width={24} />
          <Cog6ToothIcon width={24} />
        </div>
      </div>
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md shadow-sm w-56 mt-4"
          captionLayout="dropdown"
        />
      </div>

      <div>
        <div className="mt-2">
          <p className="text-md font-semibold">Completed Tasks</p>
        </div>
        <div className="mt-2 space-y-2">
          {loading ? (
            <p className="text-sm text-gray-500">Loading completed tasks...</p>
          ) : completedTasks.length === 0 ? (
            <p className="text-sm text-gray-500">No completed tasks yet</p>
          ) : (
            completedTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                <CheckIcon className="w-4 h-4  bg-blue-500 text-white rounded flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-semibold">{task.title}</p>
                  <p className="text-xs text-blue-500">
                    <span className="text-gray-500">{task.category} </span>
                    {new Date(task.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
