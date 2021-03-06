import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../shared/interfaces';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup
  submitted: boolean = false
  message!: string

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Введите данные'
      } else if (params['authFailed']) {
        this.message = "Сессия истекал. Введите данные заново"
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe((response) => {
      window.localStorage.setItem('uid', response.localId)
      this.form.reset()
      if (window.localStorage.getItem('path') == null) {
        this.router.navigate(['/'])
      } else {
        this.router.navigate([window.localStorage.getItem('path')])
      }
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }

}
