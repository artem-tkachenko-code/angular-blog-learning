import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, Todo } from '../shared/interfaces';
import { PostsService } from '../shared/posts.service';
import { TodosService } from '../shared/todos.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$!: Observable<Post[]>

  todos$!: Observable<Todo[]>

  constructor(private postsService: PostsService, private todosService: TodosService) { }

  ngOnInit() {
    this.posts$ = this.postsService.getAll()
  }

}
