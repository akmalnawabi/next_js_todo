'use client';

import { useState, useEffect } from 'react';

interface Todo {
  id: string;
  title: string;
  date: string;
  category: string;
  isCompleted: boolean;
}

interface CategoryCounts {
  [key: string]: number;
}

export function useCategoryCounts() {
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

  const getCategoryCounts = (): CategoryCounts => {
    const counts: CategoryCounts = {};
    
    // Count by category
    todos.forEach(todo => {
      counts[todo.category] = (counts[todo.category] || 0) + 1;
    });

    // Add special counts
    counts['all'] = todos.length;
    counts['completed'] = todos.filter(todo => todo.isCompleted).length;
    counts['my-day'] = todos.filter(todo => {
      const today = new Date().toDateString();
      const todoDate = new Date(todo.date).toDateString();
      return todoDate === today;
    }).length;

    return counts;
  };

  const getCountForCategory = (categoryName: string): number => {
    const counts = getCategoryCounts();
    
    // Map display names to actual category values
    const categoryMap: { [key: string]: string } = {
      'My Day': 'my-day',
      'Important': 'work',
      'Personal': 'personal',
      'All': 'all',
      'Completed': 'completed',
      'Assigned to me': 'health',
      'GoPay': 'shopping',
      'Kretya Studio': 'other',
      'Content Dump': 'other'
    };

    const actualCategory = categoryMap[categoryName];
    return counts[actualCategory] || 0;
  };

  return { getCountForCategory, loading };
} 