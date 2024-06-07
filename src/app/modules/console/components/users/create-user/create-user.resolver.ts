import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SkillsService } from '../../../services/skills.service';
import { TeamsService } from '../../../services/teams.service';
import { RolesAndPermissionsService } from '../../roles-and-permissions/roles-and-permissions.service';
// import { TeamsService } from '../../teams/teams.service';

@Injectable({
  providedIn: 'root'
})
export class CreateUserResolver implements Resolve<any> {
  resroles?:[];
  resteams?:[];
  resskills?:[];
  constructor(private roles:RolesAndPermissionsService, private teams:TeamsService, private skills: SkillsService ){}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Observable<any>> {

    await this.funcRoles();
    await this.funcTeams();
    await this.funcSkills();
    return of({role:this.resroles, team:this.resteams, skill:this.resskills});
  }
  async funcRoles(){
    this.roles.getMyRoles().subscribe((response: any) => this.resroles = response);
  }
  async funcTeams(){
    
    this.teams.getMyTeams().subscribe({ next: (res: any) => this.resteams = res });
  }
  async funcSkills(){
    
    this.skills.getMySkills().subscribe({ next: (res: any) => this.resskills = res });
  }
}
