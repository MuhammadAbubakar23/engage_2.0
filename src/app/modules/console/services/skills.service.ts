import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
import { RequestService } from 'src/app/shared/services/request/request.service';
@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  constructor(private request:RequestService) { }
  getMySkills(): Observable<MenuModel[]> {
    return this.request.getFromConsole<MenuModel[]>("getUserSkills", {}).pipe(
      map((response: any) => {
        return response;  
      })
    );
  }
}
