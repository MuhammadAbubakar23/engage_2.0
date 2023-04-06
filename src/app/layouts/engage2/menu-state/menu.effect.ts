import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of} from 'rxjs'; 
import { MenuService } from './menu.service';
import { loadMenusList, loadMenusListSuccess } from './menu.actions';

@Injectable()
export class MenusEffects {
  constructor(
    private action$: Actions,
    private menuService: MenuService
  ) {}
  loadMenus$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadMenusList),
      mergeMap((action) => {
        return this.menuService.getMenuList().pipe(
          map((menus: any) => loadMenusListSuccess({ menus })),
        //  catchError(error => of(loadMenusList(),fail({ error })))
        //   return this.actions$.pipe(
        //     ofType(MemberActions.loadMembers),
        //     mergeMap(() => this.memberService.getMembers().pipe(
        //         map(members=> MemberActions.loadMembersSuccess({ members })),
        //         catchError(error => of(MemberActions.loadMembers()Fail({ error })))
        //     )));
        );
      })
    );
  });
}


// import { Injectable } from "@angular/core";
// import { Action, Store } from "@ngrx/store";
// import { Effect, EffectsModule, Actions, ofType, createEffect } from "@ngrx/effects";
// import { Observable } from "rxjs";
// import { switchMap, catchError, map, mergeMap } from "rxjs/operators";
// import  {GetMenuListAction, GetMenuListActionSuccess, MenuActionType} from "./menu.actions";
// import { MenuService } from "./menu.service";

// @Injectable()
// export class MenuEffect {
//   constructor(private actions$: Actions, private ser: MenuService) {}
// //   @Effect()
// //   sgetMenuList$: Observable<Action> = this.actions$
// //     .ofType(MenuActionType.GET_MENU_LIST)
// //     .pipe(switchMap((action: GetMenuListAction) => {
// //         return this.ser.getMenuList()
// //     }));

//     getMenuList$ = createEffect(() =>  {
//         return this.actions$.pipe(
//           ofType(MenuActionType.GET_MENU_LIST),
//           mergeMap((action:GetMenuListAction) => {
//             return this.ser.getMenuList().pipe()
//           })
//         );
//       });  
// }