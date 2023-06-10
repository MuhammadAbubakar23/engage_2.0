import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
import { RequestService } from 'src/app/shared/services/request/request.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private request:RequestService) { }
  getAllParams(rout:string): Observable<MenuModel[]> {
    return this.request.post<MenuModel[]>(rout,{}).pipe(
      map((response: any) => {
        // if(response.length>=1) this.stor.store(storekey, response);
        // else this.stor.delete(storekey);
        return response;  
      })
    );
  }
  // getAllRoles(): Observable<MenuModel[]> {
  //     return this.request.post<MenuModel[]>("permissions",{}).pipe(
  //       map((response: any) => {
  //         // if(response.length>=1) this.stor.store(storekey, response);
  //         // else this.stor.delete(storekey);
  //         return response;  
  //       })
  //     );
  // }
  // getAllTeams(): Observable<MenuModel[]> {
  //   return this.request.post<MenuModel[]>("accesses",{}).pipe(
  //     map((response: any) => {
  //       // if(response.length>=1) this.stor.store(storekey, response);
  //       // else this.stor.delete(storekey);
  //       return response;  
  //     })
  //   );
  //   }
  //   getAllProperties(): Observable<MenuModel[]> {
  //     return this.request.post<MenuModel[]>("properties",{}).pipe(
  //       map((response: any) => {
  //         // if(response.length>=1) this.stor.store(storekey, response);
  //         // else this.stor.delete(storekey);
  //         return response;  
  //       })
  //     );
  //   }
}
