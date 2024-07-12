import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
@Injectable()
export class JsonWebTokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private ls: StorageService) { }
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes('https://entertainerbot.enteract.app')) {
      return next.handle(httpRequest);
    }
    else{
      const allToken = this.ls.retrive('token');
    let token = allToken.local; // allToken.cookie
    token = token == null ? allToken.session : token;
    token = token == null ? allToken.local : token;
    // const urlAL = "Authentication/Login"
    // httpRequest.url.includes("Login")
    if (
      token == null &&
      (!httpRequest.url.includes('Login') ||
        !httpRequest.url.includes('Register'))
    ) {
      this.router.navigate(['/identity/login']);
    }
    // if(!httpRequest.url.includes("rep")){
    //   const allToken2 = this.ls.retrive("token2");
    //   token = allToken2.local;// allToken.cookie
    // }
    if (
      token &&
      !httpRequest.url.includes('Login') &&
      !httpRequest.url.includes('Register')
    ) {
      httpRequest = httpRequest.clone({
        url: httpRequest.url,
        //  withCredentials: true,
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    // else{
    //   this.router.navigate(['/identity/login']);
    //   //return error.message;
    // }
    return next.handle(httpRequest);
  }
    }
}
