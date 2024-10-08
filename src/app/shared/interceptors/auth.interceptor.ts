import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const key = sessionStorage.getItem('token');
    if (req.url.includes('https://entertainerbot.enteract.app')) {
      return next.handle(req);
    }
   else{
    if (key != null) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      });
      return next.handle(clonedReq).pipe(
        tap(
          succ => { },
          err => {
            if (err.status == 401) {
              sessionStorage.removeItem('token');
              this.router.navigateByUrl('/login');
            }
            else if (err.status == 403)
              this.router.navigateByUrl('/forbidden');
          }
        )
      )
    }
    else
      return next.handle(req.clone());
  }
   }
}
export const authInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true }
