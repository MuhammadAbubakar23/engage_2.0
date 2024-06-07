import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ConsoleTableParams } from 'src/app/layouts/engage2/console-table/console-table-params';
import { fetchJSON } from 'src/app/shared/services/common';
@Injectable({
  providedIn: 'root'
})
export class UsersJsonResolver implements Resolve<Promise<ConsoleTableParams>> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Promise<ConsoleTableParams>> {
    return of(fetchJSON<ConsoleTableParams>("/assets/JSON/users.json"));
  }
}
