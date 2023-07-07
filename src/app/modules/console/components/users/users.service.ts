import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { RolesAndPermissionsService } from '../roles-and-permissions/roles-and-permissions.service';
import { TeamsService } from '../teams/teams.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private request: RequestService,private roles:RolesAndPermissionsService, private teams:TeamsService ) { }
  save(route:string, form:any ):any{
    return this.request.post<any>(route, form);
    // .pipe(
    //   map((response: any) => {
    //      // this.identitySubject.next(response);
    //     return response;  
    //   })
    // );
    
  }
  send(){

  }
  // async getRoles(){
  //   await this.roles.getMyRoles().subscribe({ 
  //     next: (res:any) => { 
  //       this.Roles = res;
  //       // console.log(res)
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       // this.errorMessage = err.message;
  //       // this.showError = true;
  //     }
  //   });
  // }
}
