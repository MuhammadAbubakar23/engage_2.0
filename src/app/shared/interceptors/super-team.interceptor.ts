import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';

@Injectable()
export class SuperTeamInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //debugger;
    let team = this.storage.retrive("nocompass","O").local;
   // console.log(team);
    if(typeof team === "undefined" || team ==null || team == ""){
   //   console.log(this.storage.retrive("nocompass","O"));  
    }
    else if(typeof team.id === "undefined" || team.id == null || team.id<=0){

    }
    else{
      //console.log(team.id);
      request = request.clone({
        url:  request.url,
        //withCredentials: true,
        setHeaders: {
          "X-Super-Team": JSON.stringify(team.id)
        }
      });
    }
   
  
   //return next.handle(httpRequest);
    return next.handle(request);
  }
}
