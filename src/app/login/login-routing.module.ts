import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from 'src/app/login/feature/authorization/authorization.component';
import { LoginPageComponent } from 'src/app/login/login-page.component';

const loginRoutes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    children: [
      {
        path: '',
        component: AuthorizationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule],
})

export class LoginRoutingModule { }
