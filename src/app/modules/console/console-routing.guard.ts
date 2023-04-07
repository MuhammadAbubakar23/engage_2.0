import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadMenusList } from 'src/app/layouts/engage2/menu-state/menu.actions';
import { getEmargingEqual, getEmargingNotEqual, getMenusLoading } from 'src/app/layouts/engage2/menu-state/menu.selectors';
import { MenuState } from 'src/app/layouts/engage2/menu-state/menu.state';

@Injectable({
  providedIn: 'root'
})
export class ConsoleRoutingGuard implements CanActivate, CanLoad, CanMatch {
  menus$ :any;
  menu$ :any;
  loading$: any;
  constructor(private store: Store<MenuState>, private router:Router){ //}, private headerService: HeaderService) { 
    //this.menu$ = this.store.select(getEmargingEqual("role_left_menu"));
    //console.log("1 === >>>",this.menu$);
    // this.menu$ = this.store.select(getEmargingNotEqual("role_left_menu")).subscribe((item) => {
    //   for(let itm in item){
    //     console.log(itm);
    //   }
    //   // item.forEach((element:any,index:string, arr:[])=>{ 
    //   // })
    //   this.menus$ = item;
    // })
    //this.loading$ = this.store.select(getMenusLoading)
    //this.store.dispatch(loadMenusList())
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(state.url == '/console')
      {
        //this.router.navigate(['/identity/login']);
        this.menu$ = this.store.select(getEmargingNotEqual("role_left_menu")).subscribe((item:any) => {
          for(let itm in item){
          
          }
        });
      }
      
      console.log("canActivate. ActivatedRouteSnapshot === >>>", route.url);
      console.log("canActivate. RouterStateSnapshot === >>>", state.url);
      return true;
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(route.path =='' && segments){
        console.log("----->>>>>>>>>>>>>>>>>>", segments.length)
        this.router.navigate(['/console/users']);
      }
    console.log("canMatch. Route === >>>", route);
    console.log("canMatch. segments === >>>", segments);
   
      return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      console.log("canLoad. Route === >>>", route);
      console.log("canLoad. segments === >>>", segments);
      
      return true;
  }
}
