'use client';

import { useState, useEffect } from 'react';

interface Todo {
  id: string;
  title: string;
  date: string;
  category: string;
  isCompleted: boolean;
}

export function useCompletedTasks() {
  const [completedTasks, setCompletedTasks] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      const response = await fetch('/api/todos');
      if (response.ok) {
        const data = await response.json();
        const completed = data.filter((todo: Todo) => todo.isCompleted);
        setCompletedTasks(completed);
      }
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  return { completedTasks, loading };
} 