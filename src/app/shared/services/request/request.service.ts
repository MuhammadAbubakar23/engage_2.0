import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError, map, tap } from 'rxjs';
import { EnvService } from '../env/env.service';
import { MessagingService } from '../messaging/messaging.service';
import { UserPaginationService } from 'src/app/services/userpaginationServices/user-pagination.service';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  params: HttpParams = new HttpParams();
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient, private env: EnvService,
    private paginationS:UserPaginationService,
     private messagingService: MessagingService) { }

  private requestHeaderOptions(options?: any) {

    let opt = (!options) ? {} : options;
    let headers = (opt.headers) ? opt.headers : new HttpHeaders();
    // headers.append('Content-type', 'application/json');
    opt.headers = (!options || !options.isFile) ? headers.append('Content-type', 'application/json') : headers;
    return opt;
  }
  private requestParamOptions(options?: any) {
    let opt = (!options) ? {} : options;
    let params = (opt.params) ? opt.params : new HttpParams();
    //opt.params =

  }
  private createCompleteRoute = (route: string, envAddress: string, routeparams?: any) => {

    if (routeparams === undefined) {
      routeparams = "";
    }
    debugger
    if(route===undefined){

      route='Skill/GetSkills'
    }

      return (routeparams != "" || routeparams.length > 0) ? `${envAddress}${route}${routeparams}` : `${envAddress}${route}`
   
 
  };

  get<T>(route: string, params?: any, routeparams: string = ""): Observable<T> {

    console.log(params);
    console.log(this.createCompleteRoute(this.env.paths[route], this.env.baseUrl));
    return this.http.get<T>(this.createCompleteRoute(this.env.paths[route], this.env.baseUrl, routeparams), { params ,observe: 'response'}).pipe( 
      map ((res:any)=>{
        const headers: HttpHeaders = res.headers;
      const Pagination = JSON.parse(JSON.stringify(headers.get('X-Pagination')));
      this.paginationS.sendpaginationobj(JSON.parse(Pagination))
      console.log("Response for header ====>",JSON.parse(Pagination))
        return res.body
      })
    )
      // .pipe(
      //   map((res: any) => { return res }),
      //   tap(res => console.log(route + " Response: ", res)),
      //   catchError(err => {
      //     console.log('Handling error locally and rethrowing it...', err);
      //     return throwError(() => new Error(err));
      //   })
      // );
  }
  getFromConsole<T>(route: string, params?: any, routeparams: string = ""): Observable<T> {
debugger
    console.log(params);
    console.log(this.createCompleteRoute(this.env.paths[route], this.env.consoleBaseUrl));
    return this.http.get<T>(this.createCompleteRoute(this.env.console[route], this.env.consoleBaseUrl, routeparams), { params })
      .pipe(
        map((res: any) => { return res }),
        tap(res => console.log(route + " Response: ", res)),
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => new Error(err));
        })
      );
  }
  getBy<T>(route: string, params: string): Observable<T> {
    console.log(this.createCompleteRoute(this.env.paths[route], this.env.baseUrl));
    console.log(this.createCompleteRoute(params, this.createCompleteRoute(this.env.paths[route], this.env.baseUrl)));
    return this.http.get<T>(this.createCompleteRoute(params, this.createCompleteRoute(this.env.paths[route], this.env.baseUrl)))
      .pipe(
        map((res: any) => { return res }),
        tap(res => console.log(route + " Response: ", res)),
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => new Error(err));
        })
      );
  }
  post<T>(route: string, params?: any): Observable<T> {
    console.log("this.createCompleteRoute(this.env.paths[route]", this.createCompleteRoute(this.env.paths[route], this.env.baseUrl))
    return this.http.post<T>(this.createCompleteRoute(this.env.paths[route], this.env.baseUrl), params)
      .pipe(
        map((res: any) => { return res }),
        tap(res => console.log(route + " Response: ", res)),
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => new Error(err));
        })
        // catchError( this.handleError<T>(route))
      );
  }
  put<T>(route: string, params?: any): Observable<T> {
    return this.http.put<T>(this.createCompleteRoute(this.env.paths[route], this.env.baseUrl), params)
      .pipe(
        map((res: any) => { return res }),
        tap(res => console.log(route + " Response: ", res)),
        catchError(this.handleError<T>(route))
      );
  }
  patch<T>(route: string, params?: any): Observable<T> {
    return this.http.patch<T>(this.createCompleteRoute(this.env.paths[route], this.env.baseUrl), params)
      .pipe(
        map((res: any) => { return res }),
        tap(res => console.log(route + " Response: ", res)),
        catchError(this.handleError<T>(route))
      );
  }
  delete<T>(route: string, routeparams: any, params?: any): Observable<T> {

    return this.http.get<T>(this.createCompleteRoute(this.env.paths[route], this.env.baseUrl, "?Id=" + routeparams), params)
      .pipe(
        map((res: any) => { return res }),
        tap(res => console.log(route + " Response: ", res)),
        catchError(this.handleError<T>(route))
      );
  }
  async getAsync<T>(route: string, params?: any): Promise<Observable<T>> {
    return this.http.get<T>(this.createCompleteRoute(this.env.paths[route], this.env.baseUrl), params)
      .pipe(
        map((res: any) => { return res }),
        tap(res => console.log(route + " Response: ", res)),
        catchError(this.handleError<T>(route))
      );
  }
  async postAsync<T>(route: string, params?: any): Promise<Observable<T>> {
    return await this.http.post<T>(this.createCompleteRoute(this.env.paths[route], this.env.baseUrl), params)
      .pipe(
        map((res: any) => { return res }),
        tap(res => console.log(route + " Response: ", res)),
        catchError(this.handleError<T>(route))
      );
  }
  async putAsync<T>(route: string, params?: any): Promise<Observable<T>> {
    return this.http.put<T>(this.createCompleteRoute(this.env.paths[route], this.env.baseUrl), params)
      .pipe(
        map((res: any) => { return res }),
        tap(res => console.log(route + " Response: ", res)),
        catchError(this.handleError<T>(route))
      );
  }
  async patchAsync<T>(route: string, params?: any): Promise<Observable<T>> {
    return this.http.patch<T>(this.createCompleteRoute(this.env.paths[route], this.env.baseUrl), params)
      .pipe(
        map((res: any) => { return res }),
        tap(res => console.log(route + " Response: ", res)),
        catchError(this.handleError<T>(route))
      );
  }
  async deleteAsync<T>(route: string, params?: any): Promise<Observable<T>> {
    return this.http.post<T>(this.createCompleteRoute(this.env.paths[route], this.env.baseUrl), params)
      .pipe(
        map((res: any) => { return res }),
        tap(res => console.log(route + " Response: ", res)),
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
  public log<T>(message: string, serviceName: string = "Service") {
    this.messagingService.add(`${serviceName}: ${message}`);
  }
}
