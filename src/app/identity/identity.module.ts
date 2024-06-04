import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { IdentityRoutingModule } from './identity-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { ActorsComponent } from './actors/actors.component';
import { LayoutsModule } from '../layouts/layouts.module';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SignUpComponent,
    ActorsComponent
  ],
  imports: [
    CommonModule,
    IdentityRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    LayoutsModule
  ],
  providers:[
    DatePipe
  ]
})
export class IdentityModule { }
