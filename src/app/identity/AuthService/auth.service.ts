import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl=environment.IdentityBaseUrl

  constructor(private http : HttpClient) { }

  login (form:any) {
  
    return this.http.post(this.baseUrl + '/Authentication/Login',form)
  }
  signup (form:any) {
  
    return this.http.post(this.baseUrl + '/Authentication/SignUp',form)
  }
  sendVerificationCode(form: any){
  
    return this.http.get(this.baseUrl+'/User/SendVarificationCode', form)
  }

gettoken(){  

  return !!localStorage.getItem("Login");  
  } 
}
