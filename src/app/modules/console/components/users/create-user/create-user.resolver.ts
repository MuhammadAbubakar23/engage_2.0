import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RolesAndPermissionsService } from '../../roles-and-permissions/roles-and-permissions.service';
import { TeamsService } from '../../teams/teams.service';

@Injectable({
  providedIn: 'root'
})
export class CreateUserResolver implements Resolve<any> {
  resroles?:[];
  resteams?:[];
  constructor(private roles:RolesAndPermissionsService, private teams:TeamsService ){}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Observable<any>> {
    
    //// console.log(role);
    
   // // console.log(team);
    await this.funcRoles();
    await this.funcTeams();
    return of({role:this.resroles, team:this.resteams});
  }
  async funcRoles(){
    await this.roles.getMyRoles().subscribe((response:any) => this.resroles = response);
  }
  async funcTeams(){
    await this.teams.getMyTeams().subscribe({next: (res:any) => this.resteams = res});
  }
}
