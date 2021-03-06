import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './shared/service/auth.guard';
import { SearchPipe } from './shared/search.pipe';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { VerifyEmailPageComponent } from './verify-email-page/verify-email-page.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    ForgotPasswordPageComponent,
    RegisterPageComponent,
    VerifyEmailPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'register', component: RegisterPageComponent },
          { path: 'forgot-password', component: ForgotPasswordPageComponent },
          { path: 'verify-email', component: VerifyEmailPageComponent },
          { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
          { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
          { path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard] }
        ]
      }
    ]),
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AdminModule { }
