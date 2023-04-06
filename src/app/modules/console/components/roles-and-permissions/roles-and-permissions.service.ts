import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { IdNameDto } from 'src/app/shared/Models/IdNameDto';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { Roles } from './roles';

@Injectable({
  providedIn: 'root'
})
export class RolesAndPermissionsService {

  constructor(private request:RequestService, private http:HttpClient) { }
  getMyRoles(): Observable<IdNameDto[]> {
    // return this.http.get("http://localhost:5036/api/Roles",{}).pipe(
    //   map((res: any) => { return res }),
    //   tap(res => console.log( + " Response: ", res)),
    //   catchError(err => {
    //     console.log('Handling error locally and rethrowing it...', err);
    //     return throwError(() => new Error(err));
    //   })
    // );
    return this.request.get<IdNameDto[]>("AllRoles",{}).pipe(
      map((response: any) => {
        // if(response.length>=1) this.stor.store(storekey, response);
        // else this.stor.delete(storekey);
        return response;  
      })
    );
    //.pipe(
     // map((response: any) => {
        //if(response.length>=1) this.stor.store("menu", response);
        //else this.stor.delete("menu");
    //    return response;  
    //  })
    //);
  }
}
