// Temporary in-memory storage for testing
interface Todo {
  id: string;
  title: string;
  date: Date;
  category: string;
  isCompleted: boolean;
}

class MemoryStore {
  private todos: Todo[] = [];
  private nextId = 1;

  async getAllTodos(): Promise<Todo[]> {
    return this.todos.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async createTodo(data: Omit<Todo, 'id'>): Promise<Todo> {
    const todo: Todo = {
      id: `temp-${this.nextId++}`,
      ...data
    };
    this.todos.push(todo);
    return todo;
  }

  async updateTodo(id: string, data: Partial<Todo>): Promise<Todo | null> {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;
    
    this.todos[index] = { ...this.todos[index], ...data };
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