import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError, map, tap } from 'rxjs';
// import { EnvService } from '../env/env.service';
import { MessagingService } from '../messaging/messaging.service';
import { UserPaginationService } from 'src/app/services/userpaginationServices/user-pagination.service';
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  params: HttpParams = new HttpParams();
  headers: HttpHeaders = new HttpHeaders();
  baseUrl: string = '';
  env: any;
  constructor(
    private http: HttpClient,
    private paginationS: UserPaginationService,
    private messagingService: MessagingService
  ) {
    this.baseUrl = window.location.origin;
    sessionStorage.setItem('baseUrl', this.baseUrl);
    if ((window as any)._env) {
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
      } else if (
        this.baseUrl == 'http://localhost:4200' ||
        this.baseUrl == 'https://localhost:4200'
      ) {
        this.env = (window as any)._env.stagging;
      }
    }
  }
  private requestHeaderOptions(options?: any) {
    let opt = !options ? {} : options;
    let headers = opt.headers ? opt.headers : new HttpHeaders();
    // headers.append('Content-type', 'application/json');
    opt.headers =
      !options || !options.isFile
        ? headers.append('Content-type', 'application/json')
        : headers;
    return opt;
  }
  private requestParamOptions(options?: any) {
    let opt = !options ? {} : options;
    let params = opt.params ? opt.params : new HttpParams();
    //opt.params =
  }
  private createCompleteRoute = (
    route: string,
    envAddress: string,
    routeparams?: any
  ) => {
    debugger;
    if (routeparams === undefined) {
      routeparams = '';
    }
    if (route === undefined) {
      route = 'Skill/GetSkills';
    }
    if (route === undefined) {
      route = 'Skill/GetSkills';
    }
    return routeparams != '' || routeparams.length > 0
      ? `${envAddress}${route}${routeparams}`
      : `${envAddress}${route}`;
  };
  get<T>(route: string, params?: any, routeparams: string = ''): Observable<T> {
    return this.http
      .get<T>(
        this.createCompleteRoute(
          this.env.paths[route],
          this.env.IdentityBaseUrl,
          routeparams
        ),
        { params, observe: 'response' }
      )
      .pipe(
        map((res: any) => {
          const headers: HttpHeaders = res.headers;
          const Pagination = JSON.parse(
            JSON.stringify(headers.get('X-Pagination'))
          );
          this.paginationS.sendpaginationobj(JSON.parse(Pagination));
          return res.body;
        })
      );
    // .pipe(
    //   map((res: any) => { return res }),
    //   tap(res => console.log(route + " Response: ", res)),
    //   catchError(err => {
    //     return throwError(() => new Error(err));
    //   })
    // );
  }
  getFromConsole<T>(
    route: string,
    params?: any,
    routeparams: string = ''
  ): Observable<T> {
    return this.http
      .get<T>(
        this.createCompleteRoute(
          this.env.console[route],
          this.env.ConsoleBaseUrl,
          routeparams
        ),
        { params }
      )
      .pipe(
        map((res: any) => {
          return res;
        }),
        tap((res) => console.log(route + ' Response: ', res)),
        catchError((err) => {
          return throwError(() => new Error(err));
        })
      );
  }
  getBy<T>(route: string, params: string): Observable<T> {
    return this.http
      .get<T>(
        this.createCompleteRoute(
          params,
          this.createCompleteRoute(
            this.env.paths[route],
            this.env.IdentityBaseUrl
          )
        )
      )
      .pipe(
        map((res: any) => {
          return res;
        }),
        tap((res) => console.log(route + ' Response: ', res)),
        catchError((err) => {
          return throwError(() => new Error(err));
        })
      );
  }
  post<T>(route: string, params?: any): Observable<T> {
    return this.http
      .post<T>(
        this.createCompleteRoute(
          this.env.paths[route],
          this.env.IdentityBaseUrl
        ),
        params
      )
      .pipe(
        map((res: any) => {
          return res;
        }),
        tap((res) => console.log(route + ' Response: ', res)),
        catchError((err) => {
          return throwError(() => new Error(err));
        })
        // catchError( this.handleError<T>(route))
      );
  }
  put<T>(route: string, params?: any): Observable<T> {
    return this.http
      .put<T>(
        this.createCompleteRoute(
          this.env.paths[route],
          this.env.IdentityBaseUrl
        ),
        params
      )
      .pipe(
        map((res: any) => {
          return res;
        }),
        tap((res) => console.log(route + ' Response: ', res)),
        catchError(this.handleError<T>(route))
      );
  }
  patch<T>(route: string, params?: any): Observable<T> {
    return this.http
      .patch<T>(
        this.createCompleteRoute(
          this.env.paths[route],
          this.env.IdentityBaseUrl
        ),
        params
      )
      .pipe(
        map((res: any) => {
          return res;
        }),
        tap((res) => console.log(route + ' Response: ', res)),
        catchError(this.handleError<T>(route))
      );
  }
  delete<T>(route: string, routeparams: any, params?: any): Observable<T> {
    return this.http
      .get<T>(
        this.createCompleteRoute(
          this.env.paths[route],
          this.env.IdentityBaseUrl,
          '?Id=' + routeparams
        ),
        params
      )
      .pipe(
        map((res: any) => {
          return res;
        }),
        tap((res) => console.log(route + ' Response: ', res)),
        catchError(this.handleError<T>(route))
      );
  }
  async getAsync<T>(route: string, params?: any): Promise<Observable<T>> {
    return this.http
      .get<T>(
        this.createCompleteRoute(
          this.env.paths[route],
          this.env.IdentityBaseUrl
        ),
        params
      )
      .pipe(
        map((res: any) => {
          return res;
        }),
        tap((res) => console.log(route + ' Response: ', res)),
        catchError(this.handleError<T>(route))
      );
  }
  async postAsync<T>(route: string, params?: any): Promise<Observable<T>> {
    return await this.http
      .post<T>(
        this.createCompleteRoute(
          this.env.paths[route],
          this.env.IdentityBaseUrl
        ),
        params
      )
      .pipe(
        map((res: any) => {
          return res;
        }),
        tap((res) => console.log(route + ' Response: ', res)),
        catchError(this.handleError<T>(route))
      );
  }
  async putAsync<T>(route: string, params?: any): Promise<Observable<T>> {
    return this.http
      .put<T>(
        this.createCompleteRoute(
          this.env.paths[route],
          this.env.IdentityBaseUrl
        ),
        params
      )
      .pipe(
        map((res: any) => {
          return res;
        }),
        tap((res) => console.log(route + ' Response: ', res)),
        catchError(this.handleError<T>(route))
      );
  }
  async patchAsync<T>(route: string, params?: any): Promise<Observable<T>> {
    return this.http
      .patch<T>(
        this.createCompleteRoute(
          this.env.paths[route],
          this.env.IdentityBaseUrl
        ),
        params
      )
      .pipe(
        map((res: any) => {
          return res;
        }),
        tap((res) => console.log(route + ' Response: ', res)),
        catchError(this.handleError<T>(route))
      );
  }
  async deleteAsync<T>(route: string, params?: any): Promise<Observable<T>> {
    return this.http
      .post<T>(
        this.createCompleteRoute(
          this.env.paths[route],
          this.env.IdentityBaseUrl
        ),
        params
      )
      .pipe(
        map((res: any) => {
          return res;
        }),
        tap((res) => console.log(route + ' Response: ', res)),
        catchError(this.handleError<T>(route))
      );
  }
  // handleError<T>(arg0: string, arg1: never[]): (err: any, caught: Observable<HttpEvent<T>>) => import("rxjs").ObservableInput<any> {
  //   throw new Error('Method not implemented.');
  // }
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message} `);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  public log<T>(message: string, serviceName: string = 'Service') {
    this.messagingService.add(`${serviceName}: ${message}`);
  }
}
