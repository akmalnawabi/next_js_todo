// Temporary in-memory storage for testing
export interface Todo {
  id: string;
  title: string;
  date: Date;
  category: string;
  isCompleted: boolean;
}

class MemoryStore {
  private todos: Todo[] = [
    {
      id: 'temp-1',
      title: 'Welcome to Task Manager!',
      date: new Date(),
      category: 'important',
      isCompleted: false
    },
    {
      id: 'temp-2',
      title: 'Create your first task',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      category: 'personal',
      isCompleted: false
    }
  ];
  private nextId = 3;

  async getAllTodos(): Promise<Todo[]> {
    return this.todos.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async createTodo(data: Omit<Todo, 'id'>): Promise<Todo> {
    const todo: Todo = {
      id: `temp-${this.nextId++}`,
      title: data.title,
      date: data.date instanceof Date ? data.date : new Date(data.date),
      category: data.category,
      isCompleted: data.isCompleted || false
    };
    this.todos.push(todo);
    return todo;
  }

  async updateTodo(id: string, data: Partial<Todo>): Promise<Todo | null> {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;
    
    const updatedTodo = { ...this.todos[index] };
    
    if (data.title !== undefined) updatedTodo.title = data.title;
    if (data.date !== undefined) {
      updatedTodo.date = data.date instanceof Date ? data.date : new Date(data.date);
    }
    if (data.category !== undefined) updatedTodo.category = data.category;
    if (data.isCompleted !== undefined) updatedTodo.isCompleted = data.isCompleted;
    
    this.todos[index] = updatedTodo;
    return this.todos[index];
  }

  async deleteTodo(id: string): Promise<boolean> {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return false;
    
    this.todos.splice(index, 1);
    return true;
  }

  async getTodoById(id: string): Promise<Todo | null> {
    return this.todos.find(todo => todo.id === id) || null;
  }

  async countTodos(): Promise<number> {
    return this.todos.length;
  }
}

export const memoryStore = new MemoryStore(); 