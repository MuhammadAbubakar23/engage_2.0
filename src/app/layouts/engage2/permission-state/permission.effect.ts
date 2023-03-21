import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of} from 'rxjs'; 
import { PermissionService } from './permission.service';
import { loadPermissionsList, loadPermissionsListSuccess } from './permission.actions';

@Injectable()
export class PermissionsEffects {
  constructor(
    private action$: Actions,
    private permissionService: PermissionService
  ) {}
  loadPermissions$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadPermissionsList),
      mergeMap((action) => {
        return this.permissionService.getPermissionList().pipe(
          map((permissions: any) => loadPermissionsListSuccess({ permissions })),
        //  catchError(error => of(loadPermissionsList(),fail({ error })))
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
// import  {GetPermissionListAction, GetPermissionListActionSuccess, PermissionActionType} from "./permission.actions";
// import { PermissionService } from "./permission.service";

// @Injectable()
// export class PermissionEffect {
//   constructor(private actions$: Actions, private ser: PermissionService) {}
// //   @Effect()
// //   sgetPermissionList$: Observable<Action> = this.actions$
// //     .ofType(PermissionActionType.GET_PERMISSION_LIST)
// //     .pipe(switchMap((action: GetPermissionListAction) => {
// //         return this.ser.getPermissionList()
// //     }));

//     getPermissionList$ = createEffect(() =>  {
//         return this.actions$.pipe(
//           ofType(PermissionActionType.GET_PERMISSION_LIST),
//           mergeMap((action:GetPermissionListAction) => {
//             return this.ser.getPermissionList().pipe()
//           })
//         );
//       });  
// }