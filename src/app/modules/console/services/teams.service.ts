import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
import { IdNameDto } from 'src/app/shared/Models/IdNameDto';
import { RequestService } from 'src/app/shared/services/request/request.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private request:RequestService) { }
  getAllParams(rout:string, id:any): Observable<MenuModel[]> {
    return this.request.post<MenuModel[]>(rout,id).pipe(
      map((response: any) => {
        // if(response.length>=1) this.stor.store(storekey, response);
        // else this.stor.delete(storekey);
        return response;  
      })
    );
  }
  getMyTeams(): Observable<MenuModel[]> {
    // return this.http.get("http://localhost:5036/api/Roles",{}).pipe(
    //   map((res: any) => { return res }),
    //   tap(res => console.log( + " Response: ", res)),
    //   catchError(err => {
    //     console.log('Handling error locally and rethrowing it...', err);
    //     return throwError(() => new Error(err));
    //   })
    // );
    return this.request.get<MenuModel[]>("UserTeams", {}).pipe(
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
  getMyTeamsPermissions(rout:string, id:any): Observable<MenuModel[]> {
    return this.request.getBy<MenuModel[]>(rout,id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  save(route:string, form:any ):any{
    return this.request.post<any>(route, form);
  }
}
