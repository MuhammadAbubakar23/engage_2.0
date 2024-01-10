import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl=environment.IdentityBaseUrl
  CommanBaseUrl=environment.CommonBaseUrl
  TWoFABaseUrl=environment.TwoFABaseUrl
  constructor(private http : HttpClient) { }
  loginAgent() {
    
    return this.http.get(this.CommanBaseUrl+'SignalRConnector/UserLogin')
    }



  login (form:any) {
     return this.http.post(this.TWoFABaseUrl+'Authentication/Login',form , {responseType: 'text'})
    // return this.http.post(this.baseUrl + '/Authentication/Login',form)
  }
  submitUser(body:any){
    return this.http.post(this.TWoFABaseUrl+'Authentication/LoginWithTwoFactor',body)
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
