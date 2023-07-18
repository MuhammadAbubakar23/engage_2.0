import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
import { RequestService } from 'src/app/shared/services/request/request.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  menuModel: MenuModel = { mainId:0,
    name: "",
    emerging:"",
    slug:"",
    link:"",
    desc:"",
    parentId:0,
    baseId:0,
    icon:"",
    indexNo:0,
    isSelected:false,
    isDisabled:false 
  }
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
  getCompanyById(id:any): Observable<MenuModel>{
    //console.log(id);
    if(id == null || id<=0 || typeof id === 'undefined') return of(this.menuModel);
    return this.request.getBy<MenuModel>("AllTeams", "Out/"+id).pipe(
      map((response: MenuModel) => {
        return response;  
      })
    );
  }
  getMyCompanies(): Observable<MenuModel[]> {
    // return this.http.get("http://localhost:5036/api/Roles",{}).pipe(
    //   map((res: any) => { return res }),
    //   tap(res => console.log( + " Response: ", res)),
    //   catchError(err => {
    //     console.log('Handling error locally and rethrowing it...', err);
    //     return throwError(() => new Error(err));
    //   })
    // );
    return this.request.getBy<MenuModel[]>("AllCompanies","WithOutType").pipe(
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
  getMyCompaniesPermissions(): Observable<MenuModel[]> {
    return this.request.get<MenuModel[]>("CompaniesAccesses",{}).pipe(
      map((response: any) => {
        // if(response.length>=1) this.stor.store(storekey, response);
        // else this.stor.delete(storekey);
        return response;  
      })
    );
  }
  save(route:string, form:any ):any{
    return this.request.post<any>(route, form);
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
