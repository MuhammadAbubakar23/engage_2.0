import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // CommanBaseUrl=environment.CommonBaseUrl
  // IdentityBaseUrl = environment.IdentityBaseUrl;
  baseUrl:string="";
  private env:any;
  constructor(private http : HttpClient) { 
    this.baseUrl = window.location.origin;
    if (this.baseUrl == 'https://keportal.enteract.live') {
      this.env = (window as any)._env.ke;
    } else if (this.baseUrl == 'https://engage.jazz.com.pk') {
      this.env = (window as any)._env.jazz;
    } else if (this.baseUrl == 'https://uiengage.enteract.app') {
      this.env = (window as any)._env;
    } else if (this.baseUrl == 'https://tpplui.enteract.live') {
      this.env = (window as any)._env;
    } else if (this.baseUrl == 'https://waengage.enteract.live') {
      this.env = (window as any)._env;
    } else if (this.baseUrl == 'https://bzengage.enteract.live') {
      this.env = (window as any)._env;
    } else if (this.baseUrl == 'https://uiengagerox.enteract.app') {
      this.env = (window as any)._env;
    } else if (this.baseUrl == 'http://localhost:4200' || this.baseUrl == 'https://localhost:4200') {
      this.env = (window as any)._env.demo;
    } else if (this.baseUrl == 'https://engageui.enteract.live') {
      this.env = (window as any)._env.demo;
    }

  }
  loginAgent() {
    return this.http.get(this.env.CommanBaseUrl+'SignalRConnector/UserLogin')
    }
  login (form:any) {
    return this.http.post(this.env.IdentityBaseUrl + 'Authentication/Login',form)
  }
  // TwoFA(form:any){
  //   return this.http.post(this.env.IdentityBaseUrl + 'Authentication/Login',form )
  // }
  submitUser(body:any){
    return this.http.post(this.env.IdentityBaseUrl + 'Authentication/LoginWithTwoFactor',body)
  }
  signup (form:any) {
    return this.http.post(this.env.IdentityBaseUrl + 'Authentication/SignUp',form)
  }
  sendVerificationCode(form: any){
    return this.http.get(this.env.IdentityBaseUrl+'User/SendVarificationCode', form)
  }
gettoken(){  
  return !!sessionStorage.getItem("Login");  
  } 
}
