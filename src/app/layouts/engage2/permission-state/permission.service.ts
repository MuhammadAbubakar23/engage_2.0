import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Event, NavigationStart, RoutesRecognized,
  RouteConfigLoadStart, RouteConfigLoadEnd,
  NavigationEnd, NavigationCancel, NavigationError, GuardsCheckStart, ChildActivationStart, ActivationStart, GuardsCheckEnd, ResolveStart, ResolveEnd, ChildActivationEnd, ActivationEnd, Scroll
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env/env.service';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { PermissionModel } from './permission.state';
// import { PermissionModel } from './permission.state';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private router: Router, 
            private http: HttpClient, 
            private env: EnvService, 
            private reqs: RequestService,
            private storage: StorageService) {
  }
  getLetters(type:string): Observable<any>{
    let permissions : string = '__';
    //let subpermissions : PermissionModel[] = [];
    //alert("We need processor");
    permissions = this.storage.retrive(type).local;
    if(permissions != null && permissions.length>=1) 
      return of(permissions);
    else
      return this.reqs.post<PermissionModel>(type, {"Emerging":"permission", "Inline":true}).pipe(
        map((response: any) => {
          if(typeof response === "undefined" || response === null) return "_";
          else if(response.length>=1) this.storage.store(type, response?.priviledge);
          else this.storage.delete(type);
          return response;  
        })
      );
  }
  getRolesLetters(): Observable<string> {
    return this.getLetters("accessrole");
  }
  getTeamsLetters(): Observable<string> {
    return this.getLetters("accessteam");
    //this.ers.PermissionModel('PermissionModel', {"equal":1, "role":2}, 'mecho');
    // console.log(this.env.baseUrl);
    // console.log(route);
    // console.log(this.env.paths);
    // console.log(this.env.paths[route]);
    // let permissions : string = '__';
    // //let subpermissions : PermissionModel[] = [];
    // //alert("We need processor");
    // permissions = this.stor.retrive("subpermission").local;
    // if(permissions != null && permissions.length>=1) 
    //   return of(permissions);
    // else
    //   return this.reqs.post<string>('access', {"Emerging":"permission", "Inline":true}).pipe(
    //     map((response: any) => {
    //       if(typeof response === "undefined" || response === null) return "_";
    //       else if(response.length>=1) this.stor.store("subpermission", response.data);
    //       else this.stor.delete("subpermission");
    //       return response;  
    //     })
    //   );

      // for(let res in response){
            //   if(response[res].parentId === response[res].baseId)
            //     permissions.push(response[res]);
            //   else  
            //     subpermissions.push(response[res]);
              
            //     console.log(response[res].parentId );
            // }
            // 
            // this.stor.store('smecho', subpermissions );
            
            // console.log(Object.keys(response));//.filter( val => val.parentId == val.baseId );
            // console.log(Object.values(response));
            // let permissions = Object.values(response).filter(
            //   value => value.parentId === value.baseId,
            // );
            // let subpermissions = Object.values(response).filter(
            //   value => value.parentId !== value.baseId,
            // );
      // console.log("start response data");
      // console.log(response);
      // console.log("end response data");
      //   permissions = Object.values(response.data).filter(
      //     value => value.parentId === value.baseId,
      //  );
      //  let subpermissions = Object.values(response).filter(
      //    value => value.parentId !== value.baseId,
      //  );
      //if (response.success) {
      // return response.data;
      //} else {
      //  return throwError(error);
      //}
      // return this.http.get<PermissionModel[]>(this.env.createCompleteRoute(this.env.paths[route],this.env.baseUrl));

        // (Object.keys(response) as (keyof typeof response)[]).forEach((key, index) => {
            //   // 👇️ name Tom 0, country Chile 1
            //   console.log(key, response[key], index);
            // });
          
            // (Object.values(response) as (keyof typeof response)[]).forEach((key, index) => {
            //   //if(key.parentId === key.baseId){

            //   //}
            //   //return key.parentId === key.baseId
            //   // 👇️ name Tom 0, country Chile 1
            //   console.log(key, response[key], index);
            // });
           // console.log(Object.keys(response));//.filter( val => val.parentId == val.baseId );
           // console.log(Object.values(response));
            
      // ers.getter("PermissionModel").pipe(
      //   map((response: { success: any; data: any; }) => {
      //     if (response.success) {
      //       return response.data;
      //     } else {
      //       return throwError(error);
      //     }
      //   }),
      //   catchError(error => {
      //       errorMsg = error.message;
      //       return of([]);
      //   })
      // );
  }
}
