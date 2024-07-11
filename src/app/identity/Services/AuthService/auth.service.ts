import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  CommanBaseUrl = environment.CommonBaseUrl;
  IdentityBaseUrl = environment.IdentityBaseUrl;

  constructor(private http: HttpClient) {}
  loginAgent() {
    return this.http.get(this.CommanBaseUrl + 'SignalRConnector/UserLogin');
  }
  login(form: any) {
    return this.http.post(this.IdentityBaseUrl + 'Authentication/Login', form);
  }
  // TwoFA(form:any){
  //   return this.http.post(this.IdentityBaseUrl + 'Authentication/Login',form )
  // }
  submitUser(body: any) {
    return this.http.post(
      this.IdentityBaseUrl + 'Authentication/LoginWithTwoFactor',
      body
    );
  }
  signup(form: any) {
    return this.http.post(this.IdentityBaseUrl + 'Authentication/SignUp', form);
  }
  sendVerificationCode(form: any) {
    return this.http.get(
      this.IdentityBaseUrl + 'User/SendVarificationCode',
      form
    );
  }
  gettoken() {
    return !!sessionStorage.getItem('Login');
  }
}
