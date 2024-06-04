import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorsComponent } from './actors/actors.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'forgotpassword',
    component:ForgotPasswordComponent
  },
  {
    path:'resetpassword',
    component:ResetPasswordComponent
  },
  {
    path:'sign-up',
    component:SignUpComponent
  },
  {
    path:'loginAs',
    component:ActorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentityRoutingModule { }
