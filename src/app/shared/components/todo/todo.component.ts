import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/admin/shared/service/alert.service';
import { Todo } from '../../interfaces';
import { TodosService } from '../../todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  loading: boolean = false

  todoTitle: string = ''

  error: string = ''


  constructor(private todosService: TodosService, private alert: AlertService) {

  }

  todos: Todo[] = [];

  userTodos: Todo[] | undefined = []

  ngOnInit() {
    this.todosService.refreshTodo$.subscribe(() => {
      this.fetchTodos()
    })
    this.fetchTodos()
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return
    }
    const todo = {
      title: this.todoTitle,
      completed: false,
      uid: window.localStorage.getItem('uid')
    }
    this.todosService.addTodo(todo)
      .subscribe((todoRes: any) => {
        this.alert.success('Todo создано')
        this.todos.unshift({ ...todo, id: todoRes.name })
        this.todoTitle = ''
      })
  }

  fetchTodos() {
    this.loading = true
    this.todosService.fetchTodos()
      .subscribe((todos: Todo[] | undefined) => {
        if (todos) {
          this.todos = todos.filter(t => t.uid === window.localStorage.getItem('uid'))
          this.loading = false
        } else {
          this.loading = false
          return
        }
      }, (error: { message: string; }) => {
        this.error = error.message
      })
  }

  removeTodo(id: any) {
    this.todosService.removeTodo(id)
      .subscribe(() => {
        this.alert.danger('Todo удалён')
        this.todos = this.todos.filter(t => t.id !== id)
      })
  }

  completeTodo(id: string | undefined) {
    const completed = this.todos.find(t => {
      return t.id === id
    })
    this.todosService.completeTodo(completed).subscribe((todo: Todo) => {
      this.alert.success('Todo завершён')
      if (completed) completed.completed = true
    })
  }

}

