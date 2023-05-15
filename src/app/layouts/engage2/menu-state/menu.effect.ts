import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, Observable, of, switchMap} from 'rxjs'; 
import { MenuService } from './menu.service';
import { loadMenusList, loadMenusListFail, loadMenusListSuccess, updateMenusList, updateMenusListFail, updateMenusListSuccess } from './menu.actions';
import { MenuModel } from './menu.model';

@Injectable()
export class MenusEffects {
  constructor(
    private action$: Actions,
    private menuService: MenuService
  ) {}
  //public readonly 
  loadMenus$: Observable<any> = createEffect(() => {
    return this.action$.pipe(
      ofType(loadMenusList),
      mergeMap((action) => {
        return this.menuService.getTeamsList().pipe(
          map((menus: MenuModel[]) => loadMenusListSuccess({ menus })),
          catchError((error: string | null) => of(loadMenusListFail({ error })))
          //  catchError(error => of(loadMenusList(),fail({ error })))
          //   return this.actions$.pipe(
          //     ofType(MemberActions.loadMembers),
          //     mergeMap(() => this.memberService.getMembers().pipe(
          //         map(members=> MemberActions.loadMembersSuccess({ members })),
          //         catchError(error => of(MemberActions.loadMembers()Fail({ error })))
          //  )));
        );
      })
    );
  });
  updateMenus$: Observable<any> = createEffect(() => {
    return this.action$.pipe(
      ofType(updateMenusList),
      mergeMap((action) => {
        return this.menuService.getRolesList().pipe(
          map((menus: MenuModel[]) => updateMenusListSuccess({ menus })),
          catchError((error: string | null) => of(updateMenusListFail({ error })))
          //  catchError(error => of(loadMenusList(),fail({ error })))
          //   return this.actions$.pipe(
          //     ofType(MemberActions.loadMembers),
          //     mergeMap(() => this.memberService.getMembers().pipe(
          //         map(members=> MemberActions.loadMembersSuccess({ members })),
          //         catchError(error => of(MemberActions.loadMembers()Fail({ error })))
          //  )));
        );
      })
    );
  });
  // updateMenus$: Observable<any> = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(updateMenusList),
  //     map((menus: MenuModel[]) => updateMenusListSuccess({ menus })),
  //     catchError((error: string | null) =>   of(updateMenusListFail({ error }))  )
  //   );
  // });
  // public readonly addBook$: Observable<any> = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(BookActionsNames.AddBook),
  //     map((data: any) => {
  //       const book: Book = data.data;
  //       return bupdateMenusListSuccess({ data: book });
  //     }),
  //     catchError((error: string | null) =>
  //       of(updateMenusListFail({ error }))
  //     )
  //   );
  // });
  // public readonly loadBooks$: Observable<any> = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(loadMenusList),
  //     switchMap( action => this.menuService.getMenuList()),
  //     map((data: MenuModel[]) => loadMenusListSuccess({ data })),
  //     catchError((error: string | null) =>
  //       of(loadMenusListFail({ error }))
  //     )
  //   );
  // });
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