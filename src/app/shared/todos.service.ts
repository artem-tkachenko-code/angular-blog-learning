import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Todo } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${environment.fbDbUrl}/todos.json`, todo, {
    })
  }

  fetchTodos(): Observable<Todo[] | undefined> {
    return this.http.get<Todo[]>(`${environment.fbDbUrl}/todos.json`, {
    })
      .pipe(
        map((response: { [key: string]: any }) => {
          if (response) {
            return Object.keys(response).map(key => ({
              ...response[key],
              id: key,
            }))
          } else return
        }),
        catchError(error => {
          // console.log(error.message)
          return throwError(error)
        })
      )
  }

  removeTodo(id: Todo | undefined): Observable<any> {
    return this.http.delete<void>(`${environment.fbDbUrl}/todos/${id}.json`, {
      observe: 'events'
    })
    // .pipe(
    //   tap(event => {
    //     if (event.type === HttpEventType.Sent) {
    //       console.log('Sent', event);
    //     }
    //     if (event.type === HttpEventType.Response) {
    //       console.log('Response', event);
    //     }
    //   })
    // )
  }

  completeTodo(todo: Todo | undefined): Observable<Todo> {
    return this.http.put<Todo>(`${environment.fbDbUrl}/todos/${todo?.id}.json`, {
      title: todo?.title,
      completed: true,
      id: todo?.id
    }, {
      responseType: 'json'
    })
  }
}
