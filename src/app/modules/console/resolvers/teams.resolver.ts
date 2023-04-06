import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IdNameDto } from 'src/app/shared/Models/IdNameDto';
import { TeamsService } from '../components/teams/teams.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsResolver implements Resolve<IdNameDto[]> {
  constructor(private teams:TeamsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  IdNameDto[] | Observable<IdNameDto[]> | Promise<IdNameDto[]>  {
    return this.teams.getMyTeams();//.subscribe((response:any) => this.resroles = response);
    //return of(true);
  }
}
