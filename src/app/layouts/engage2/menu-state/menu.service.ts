import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Event, NavigationStart, RoutesRecognized,
  RouteConfigLoadStart, RouteConfigLoadEnd,
  NavigationEnd, NavigationCancel, NavigationError, GuardsCheckStart, ChildActivationStart, ActivationStart, GuardsCheckEnd, ResolveStart, ResolveEnd, ChildActivationEnd, ActivationEnd, Scroll
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env/env.service';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { MenuModel } from './menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private router: Router, 
            private http: HttpClient, 
            private env: EnvService, 
            private reqs: RequestService,
            private storage: StorageService) {
    // router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationStart) {
    //     console.clear();
    //     // * NavigationStart: Navigation starts.
    //   }
    //   else if (event instanceof RouteConfigLoadStart) {
    //     // * RouteConfigLoadStart: Before the router lazy loads a route configuration.
    //   }
    //   else if (event instanceof RouteConfigLoadEnd) {
    //     // * RouteConfigLoadEnd: After a route has been lazy loaded.
    //   }
    //   else if (event instanceof RoutesRecognized) {
    //     // * RoutesRecognized: When the router parses the URL and the routes are recognized.
    //   }
    //   else if (event instanceof GuardsCheckStart) {
    //     // * GuardsCheckStart: When the router begins the guards phase of routing.
    //   }
    //   else if (event instanceof ChildActivationStart) {
    //     // * ChildActivationStart: When the router begins activating a route's children.
    //   }
    //   else if (event instanceof ActivationStart) {
    //     // * ActivationStart: When the router begins activating a route.
    //   }
    //   else if (event instanceof GuardsCheckEnd) {
    //     // * GuardsCheckEnd: When the router finishes the guards phase of routing successfully.
    //   }
    //   else if (event instanceof ResolveStart) {
    //     // * ResolveStart: When the router begins the resolve phase of routing.
    //   }
    //   else if (event instanceof ResolveEnd) {
    //     // * ResolveEnd: When the router finishes the resolve phase of routing successfully.
    //   }
    //   else if (event instanceof ChildActivationEnd) {
    //     // * ChildActivationEnd: When the router finishes activating a route's children.
    //   }
    //   else if (event instanceof ActivationEnd) {
    //     // * ActivationEnd: When the router finishes activating a route.
    //   }
    //   else if (event instanceof NavigationEnd) {
    //     // * NavigationEnd: When navigation ends successfully.
    //   }
    //   else if (event instanceof NavigationCancel) {
    //     // * NavigationCancel: When navigation is canceled.
    //   }
    //   else if (event instanceof NavigationError) {
    //     // * NavigationError: When navigation fails due to an unexpected error.
    //   }
    //   else if (event instanceof Scroll) {
    //     // * Scroll: When the user scrolls.
    //   }
    // });
  }
  getList(type:string):Observable<MenuModel[]>{
    let menus : MenuModel[] = [];
    menus = this.storage.retrive(type, 'O').local;
    if(menus != null && menus.length>=1) 
      return of(menus);
    else
      return this.reqs.get<MenuModel[]>(type, {"Emerging":"menu", "Inline":false}).pipe(
        map((response: MenuModel[]) => {
          if(response.length>=1) this.storage.store(type, response);
          else this.storage.delete(type);
          return response;  
        })
      );
  }
  getRolesList(): Observable<MenuModel[]> {
    return this.getList("accessrole");
  }
  getTeamsList(): Observable<MenuModel[]> {
    return this.getList("accessteam");
  }
}
