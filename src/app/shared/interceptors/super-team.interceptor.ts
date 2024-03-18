import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';

@Injectable()
export class SuperTeamInterceptor implements HttpInterceptor {
  companyId: number = 650;
  baseUrl: string = "";
  constructor(private storage: StorageService) { }

  intercept(request: HttpRequest<unknown>,
    next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.baseUrl = window.location.origin
    if (this.baseUrl == 'https://keportal.enteract.live') {
      this.companyId = 651;
    } else if (this.baseUrl == 'https://engage.jazz.com.pk') {
      this.companyId = 650;
    }
    else if (this.baseUrl == 'https://uiengage.enteract.app') {
      this.companyId = 657
    }
    else if (this.baseUrl == 'https://tppl.enteract.live') {
      this.companyId = 652
    }
    else if (this.baseUrl == 'https://waengage.enteract.live') {
      this.companyId = 653
    }
    else if (this.baseUrl == 'https://bzengage.enteract.live') {
      this.companyId = 654
    }
    else if (this.baseUrl == 'https://uiengagerox.enteract.app') {
      this.companyId = 650
    }

    let team = this.storage.retrive('nocompass', 'O').local;
    // console.log(team);
    // if (typeof team === 'undefined' || team == null || team == '') {
    //   //   console.log(this.storage.retrive("nocompass","O"));
    // } else if (
    //   typeof team.id === 'undefined' ||
    //   team.id == null ||
    //   team.id <= 0
    // ) {
    // } else {
    //   
    //   //console.log(team.id);
    //   request = request.clone({

    //     url: request.url,
    //     //withCredentials: true,
    //     setHeaders: {
    //       'X-Super-Team': JSON.stringify(this.companyId),
    //     },
    //   });
    // }




    if (typeof team === 'undefined' || team == null || team == '') {
      //   console.log(this.storage.retrive("nocompass","O"));
      request = request.clone({
        url: request.url,
        //withCredentials: true,
        setHeaders: {
          'X-Super-Team': JSON.stringify(this.companyId),
        },
      });
    } else if (
      typeof team.id === 'undefined' ||
      team.id == null ||
      team.id <= 0
    ) {
    } else {

      //console.log(team.id);
      request = request.clone({

        url: request.url,
        //withCredentials: true,
        setHeaders: {
          'X-Super-Team': JSON.stringify(team.id),
        },
      });
    }













    //return next.handle(httpRequest);
    return next.handle(request);
  }
}
