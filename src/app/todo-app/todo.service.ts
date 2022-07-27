import { Injectable } from '@angular/core';
import type { Todo } from './todo';

@Injectable()
export class TodoService {
  public todos: Todo[] = [
    {
      id: 1,
      title: 'html',
      completed: false,
    },
  ];

  constructor() {}
  addTodo(title: string) {
    if (title.trim()) {
      const maxId = Math.max(...this.todos.map((todo) => todo.id), 0);
      this.todos.push({
        id: maxId + 1,
        title: title.trim(),
        completed: false,
      });
    }
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.findIndex((item) => item === todo);
    this.todos.splice(index, 1);
  }

  editTodo(todo: Todo) {
    this.todos.forEach((item) => {
      if (item.id === todo.id) {
        item.title = todo.title;
      }
    });
  }

  completeAll() {
    this.todos.forEach((item) => {
      item.completed = true;
    });
  }

  clearAllComplete() {
    let len = this.todos.length;
    while (len > 0) {
      const todo = this.todos[len - 1];
      if (todo.completed) {
        this.deleteTodo(todo);
      }
      len--;
    }
  }
}
