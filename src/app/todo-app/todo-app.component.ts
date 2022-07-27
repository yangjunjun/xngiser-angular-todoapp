import { Component } from '@angular/core';
import type { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css'],
  providers: [TodoService],
})
export class TodoAppComponent {
  todos: Todo[] = this.todoService.todos;
  title: string = '';
  currentEditTodo: Todo | null = null;
  oldEditTodo: Todo | null = null;
  filterType: string = 'all'; // all | completed | uncompleted
  constructor(public todoService: TodoService) {}
  get fixedTodos() {
    return this.todos.filter((item) => {
      if (this.filterType === 'all') {
        return true;
      } else if (this.filterType === 'completed') {
        return item.completed;
      } else {
        return !item.completed;
      }
    });
  }
  addTodo(title: string) {
    this.todoService.addTodo(title);
    this.title = '';
  }
  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
  startEditTodo(todo: Todo) {
    this.currentEditTodo = todo;
    this.oldEditTodo = { ...todo };
  }
  cancelEditTodo() {
    this.currentEditTodo = null;
    this.oldEditTodo = null;
  }
  confirmEditTodo() {
    this.currentEditTodo = null;
    this.todoService.editTodo(this.oldEditTodo);
    this.oldEditTodo = null;
  }
  handleKeyup(event, title) {
    if (event.keyCode === 13) {
      this.addTodo(title);
    }
  }
  handleKeyupConfirm(event) {
    if (event.keyCode === 13) {
      this.confirmEditTodo();
    }
  }
  completeAll() {
    this.todoService.completeAll();
  }
  clearAllComplete() {
    this.todoService.clearAllComplete();
  }
  show(type) {
    this.filterType = type;
  }
}
