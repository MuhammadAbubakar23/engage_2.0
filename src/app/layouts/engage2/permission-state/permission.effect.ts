import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, Observable, of} from 'rxjs'; 
import { PermissionService } from './permission.service';
import { loadPermissionsLetters, loadPermissionsLettersFail, loadPermissionsLettersSuccess } from './permission.actions';
import { PermissionModel } from './permission.state';

@Injectable()
export class PermissionsEffects {
  constructor(
    private action$: Actions,
    private permissionService: PermissionService
  ) {}
  // updatePermissions$ : Observable<any> = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(loadPermissionsLetters),
  //     mergeMap((action) => {
  //       return this.permissionService.getTeamsLetters().pipe(
  //         map((permissions: PermissionModel) => loadPermissionsLettersSuccess({ permissions })),
  //         catchError((error: string ) => of(loadPermissionsLettersFail({ error })))
  //       );
  //     })
  //   );
  // });
  loadPermissions$: Observable<any> = createEffect(() => {
    return this.action$.pipe(
      ofType(loadPermissionsLetters),
      mergeMap((action) => {
        return this.permissionService.getRolesLetters().pipe(
          map((permissions: PermissionModel) => loadPermissionsLettersSuccess({ permissions })),
          catchError((error: string ) => of(loadPermissionsLettersFail({ error })))
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
// import  {GetPermissionLettersAction, GetPermissionLettersActionSuccess, PermissionActionType} from "./permission.actions";
// import { PermissionService } from "./permission.service";

// @Injectable()
// export class PermissionEffect {
//   constructor(private actions$: Actions, private ser: PermissionService) {}
// //   @Effect()
// //   sgetPermissionLetters$: Observable<Action> = this.actions$
// //     .ofType(PermissionActionType.GET_PERMISSION_LETTERS)
// //     .pipe(switchMap((action: GetPermissionLettersAction) => {
// //         return this.ser.getPermissionLetters()
// //     }));

//     getPermissionLetters$ = createEffect(() =>  {
//         return this.actions$.pipe(
//           ofType(PermissionActionType.GET_PERMISSION_LETTERS),
//           mergeMap((action:GetPermissionLettersAction) => {
//             return this.ser.getPermissionLetters().pipe()
//           })
//         );
//       });  
// }