import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, timer } from "rxjs";
import { retry, tap } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable()
export class RetryInterceptor implements HttpInterceptor{
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(retry({count: 2, delay: this.shouldRetry}));
    }
    shouldRetry(error: HttpErrorResponse){
        if(error.status >= 500){
          return timer(1000);
        }
        throw error;    
    }
}
export const RetryInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true }