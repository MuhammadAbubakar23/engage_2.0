import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';

@Injectable()
export class ResponseErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private ls:StorageService) { }
  //responseErro
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.responseType === 'json') {
        
    }
    return next.handle(req)
    .pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      //  // console.log('event--->>>', event);
      }
      return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // A client-side error: Retrigger
          // // console.log('error event--->>>', error);
          let errorMessage = this.handleError(error);        
          return throwError(() => new Error(errorMessage));
          
          
        }else{
          reportError(error.message);          
          //if(error.status == 200 && error.ok === false) return error.message;
          // error.clone({body: this.jsonParser.parse(event.body)})
          // error.clone({body: null})
          // // console.log('error 22222 event--->>>', error);
          return throwError(() => new Error(error.error));
        }
        
      })
    )

  }

  private handleError = (error: HttpErrorResponse) : any => {
    if(error.status === 404){
      return this.handleNotFound(error);
    }
    else if(error.status === 400){
      return this.handleBadRequest(error);
    }
    else if(error.status === 401) {
      return this.handleUnauthorized(error);
    }
   
    return error.message;
  }
  private handleJsonResponse = (error: HttpErrorResponse): string => {
    this.router.navigate(['/204']);
    return error.message;
  }
  private handleNotFound = (error: HttpErrorResponse): string => {
    this.router.navigate(['/404']);
    return error.message;
  }
  
  private handleUnauthorized = (error: HttpErrorResponse) => {
    this.ls.clear();
    if(this.router.url === '/identity/login') {
      return 'Authentication failed. Wrong Username or Password';
    }
    else {
      this.router.navigate(['/identity/login']);
      return error.message;
    }
  }

  private handleBadRequest = (error: HttpErrorResponse): string => {
    if(this.router.url === '/identity/register'){
      let message = '';
      const values = Object.values(error.error.errors);

      values.map( m => { message += m + '<br>'; })
      
      return message.slice(0, -4);
    }
    else{
      return error.error ? error.error : error.message;
    }
  }
}
