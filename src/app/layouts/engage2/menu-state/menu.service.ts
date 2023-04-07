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
            private stor: StorageService) {
    // router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationStart) {
    //     console.clear();
    //     // * NavigationStart: Navigation starts.
    //     console.log('NavigationStart --- ', event.url);
    //   }
    //   else if (event instanceof RouteConfigLoadStart) {
    //     // * RouteConfigLoadStart: Before the router lazy loads a route configuration.
    //     console.log('RouteConfigLoadStart --- ', event.toString());
    //   }
    //   else if (event instanceof RouteConfigLoadEnd) {
    //     // * RouteConfigLoadEnd: After a route has been lazy loaded.
    //     console.log('RouteConfigLoadEnd --- ', event.toString());
    //   }
    //   else if (event instanceof RoutesRecognized) {
    //     // * RoutesRecognized: When the router parses the URL and the routes are recognized.
    //     console.log('RoutesRecognized --- ', event.url);
    //   }
    //   else if (event instanceof GuardsCheckStart) {
    //     // * GuardsCheckStart: When the router begins the guards phase of routing.
    //     console.log('GuardsCheckStart --- ', event.url);
    //   }
    //   else if (event instanceof ChildActivationStart) {
    //     // * ChildActivationStart: When the router begins activating a route's children.
    //     console.log('ChildActivationStart --- ', event.toString());
    //   }
    //   else if (event instanceof ActivationStart) {
    //     // * ActivationStart: When the router begins activating a route.
    //     console.log('ActivationStart --- ', event.toString());
    //   }
    //   else if (event instanceof GuardsCheckEnd) {
    //     // * GuardsCheckEnd: When the router finishes the guards phase of routing successfully.
    //     console.log('GuardsCheckEnd --- ', event.url);
    //   }
    //   else if (event instanceof ResolveStart) {
    //     // * ResolveStart: When the router begins the resolve phase of routing.
    //     console.log('ResolveStart --- ', event.url);
    //   }
    //   else if (event instanceof ResolveEnd) {
    //     // * ResolveEnd: When the router finishes the resolve phase of routing successfully.
    //     console.log('ResolveEnd --- ', event.url);
    //   }
    //   else if (event instanceof ChildActivationEnd) {
    //     // * ChildActivationEnd: When the router finishes activating a route's children.
    //     console.log('ChildActivationEnd --- ', event.toString());
    //   }
    //   else if (event instanceof ActivationEnd) {
    //     // * ActivationEnd: When the router finishes activating a route.
    //     console.log('ActivationEnd --- ', event.toString());
    //   }
    //   else if (event instanceof NavigationEnd) {
    //     // * NavigationEnd: When navigation ends successfully.
    //     console.log('NavigationEnd --- ', event.url);
    //   }
    //   else if (event instanceof NavigationCancel) {
    //     // * NavigationCancel: When navigation is canceled.
    //     console.log('NavigationCancel --- ', event.url);
    //   }
    //   else if (event instanceof NavigationError) {
    //     // * NavigationError: When navigation fails due to an unexpected error.
    //     console.log('NavigationError --- ', event.error);
    //   }
    //   else if (event instanceof Scroll) {
    //     // * Scroll: When the user scrolls.
    //     console.log('Scroll --- ', event.position);
    //   }
    // });
  }

  getMenuList(): Observable<MenuModel[]> {
    //this.ers.MenuModel('MenuModel', {"equal":1, "role":2}, 'mecho');
    // console.log(this.env.baseUrl);
    // console.log(route);
    // console.log(this.env.paths);
    // console.log(this.env.paths[route]);
    let menus : MenuModel[] = [];
    //let submenus : MenuModel[] = [];
    //alert("We need processor");
    menus = this.stor.retrive("menu", 'O').local;
    if(menus != null && menus.length>=1) 
      return of(menus);
    else
      return this.reqs.put<MenuModel[]>('access', {"Emerging":"menu", "Inline":false}).pipe(
        map((response: any) => {
          if(response.length>=1) this.stor.store("menu", response);
          else this.stor.delete("menu");
          return response;  
        })
      );

      // for(let res in response){
            //   if(response[res].parentId === response[res].baseId)
            //     menus.push(response[res]);
            //   else  
            //     submenus.push(response[res]);
              
            //     console.log(response[res].parentId );
            // }
            // 
            // this.stor.store('smecho', submenus );
            
            // console.log(Object.keys(response));//.filter( val => val.parentId == val.baseId );
            // console.log(Object.values(response));
            // let menus = Object.values(response).filter(
            //   value => value.parentId === value.baseId,
            // );
            // let submenus = Object.values(response).filter(
            //   value => value.parentId !== value.baseId,
            // );
      // console.log("start response data");
      // console.log(response);
      // console.log("end response data");
      //   menus = Object.values(response.data).filter(
      //     value => value.parentId === value.baseId,
      //  );
      //  let submenus = Object.values(response).filter(
      //    value => value.parentId !== value.baseId,
      //  );
      //if (response.success) {
      // return response.data;
      //} else {
      //  return throwError(error);
      //}
      // return this.http.get<MenuModel[]>(this.env.createCompleteRoute(this.env.paths[route],this.env.baseUrl));

        // (Object.keys(response) as (keyof typeof response)[]).forEach((key, index) => {
            //   // 👇️ name Tom 0, country Chile 1
            //   console.log(key, response[key], index);
            // });
          
            // (Object.values(response) as (keyof typeof response)[]).forEach((key, index) => {
            //   //if(key.parentId === key.baseId){

            //   //}
            //   //return key.parentId === key.baseId
            //   // 👇️ name Tom 0, country Chile 1
            //   console.log(key, response[key], index);
            // });
           // console.log(Object.keys(response));//.filter( val => val.parentId == val.baseId );
           // console.log(Object.values(response));
            
      // ers.getter("MenuModel").pipe(
      //   map((response: { success: any; data: any; }) => {
      //     if (response.success) {
      //       return response.data;
      //     } else {
      //       return throwError(error);
      //     }
      //   }),
      //   catchError(error => {
      //       errorMsg = error.message;
      //       return of([]);
      //   })
      // );
  }
}
