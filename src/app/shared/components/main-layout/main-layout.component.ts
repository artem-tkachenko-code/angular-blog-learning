import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/shared/service/auth.service';
import { TodosService } from '../../todos.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  isLogin: boolean = false

  constructor(public auth: AuthService, private router: Router, private todoService: TodosService) { }

  ngOnInit() {
    this.isAuth()
  }

  isLogout() {
    this.auth.logout()
    this.todoService.refreshTodo$.next('t')
    window.localStorage.setItem('path', this.router.url)
    this.isLogin = false
    this.isAuth()
  }

  isAuth() {
    if (window.localStorage.getItem('fb-token') === null) {
      this.isLogin = true
    } else this.isLogin = false
  }
}
