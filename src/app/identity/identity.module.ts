import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentityRoutingModule } from './identity-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FacebookComponent } from '../modules/responder/components/Facebook/facebook.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SignUpComponent,
    
  ],
  imports: [
    CommonModule,
    IdentityRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule

  ],
  providers:[
    FacebookComponent
  ]
})
export class IdentityModule { }
