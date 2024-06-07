import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env/env.service';
@Injectable()
export class AppTokenInterceptor implements HttpInterceptor {
  constructor(private envUrl: EnvService) { }
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      httpRequest = httpRequest.clone({
        url:  httpRequest.url,
      //  withCredentials: true,
        setHeaders: {
          "X-APP-KEY": `${this.envUrl.appKey}`
        }
      });
    return next.handle(httpRequest);
  }
}
