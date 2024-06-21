
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { PermissionModel } from './permission.state';
// import { PermissionModel } from './permission.state';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  // private router: Router, 
  // private http: HttpClient, 
  // private env: EnvService, 
  constructor(private reqs: RequestService, private storage: StorageService) { }
  getLetters(type:string): Observable<PermissionModel>{
    let permissions:PermissionModel;
    //let subpermissions : PermissionModel[] = [];
    //alert("We need processor");
    permissions = this.storage.retrive(type,"O").local;  

    if(permissions != null && permissions?.priviledge?.length>=1) 
      return of(permissions);
    else
      return this.reqs.post<PermissionModel>(type, {"Emerging":"permission", "Inline":true}).pipe(
        map((response: PermissionModel) => {
          //if(typeof response === "undefined" || response === null) return new PermissionModel();
          //else 
          if(response?.priviledge?.length>=1) this.storage.store(type, response);
          else this.storage.delete(type);
          return response;  
        })
      );
  }
  getRolesLetters(): Observable<PermissionModel> {
    return this.getLetters("permissionrole");
  }
  // getTeamsLetters(): Observable<PermissionModel> {
  //   return this.getLetters("permissionteam");
 
  // }
}
