import { Action, createAction, props } from '@ngrx/store';
import { PermissionModel } from './permission.state';
//import { PermissionModel } from './permission.model';
// import { PermissionState,PermissionModel } from './permission.state';


export const LOAD_PERMISSION_LETTERS = '[permission letters] load permissions';
export const LOAD_PERMISSION_LETTERS_SUCCESS = '[permission letters] load permissions success';
export const LOAD_PERMISSION_LETTERS_FAIL = '[permission letters] load permissions fail';
export const UPDATE_PERMISSION_LETTERS = '[permission letters] update permissions';
export const UPDATE_PERMISSION_LETTERS_SUCCESS = '[permission letters] update permissions success';
export const UPDATE_PERMISSION_LETTERS_FAIL = '[permission letters] update permissions fail';




export const loadPermissionsLetters = createAction(LOAD_PERMISSION_LETTERS);
export const loadPermissionsLettersSuccess = createAction(LOAD_PERMISSION_LETTERS_SUCCESS, props<{ permissions: string }>());
export const loadPermissionsLettersFail = createAction(LOAD_PERMISSION_LETTERS_FAIL, props<{ error: string }>());

export const updatePermissionsLetters = createAction(UPDATE_PERMISSION_LETTERS);
export const updatePermissionsLettersSuccess = createAction(UPDATE_PERMISSION_LETTERS_SUCCESS, props<{ permissions: string }>());
export const updatePermissionsLettersFail = createAction(UPDATE_PERMISSION_LETTERS_FAIL, props<{ error: string }>());



// export const PermissionActionType = {
//   GET_PERMISSION_LIST: "[Permission] Get Permission List",
//   GET_PERMISSION_LIST_SUCCESS: "[Permission] Get Permission List success",
//   GET_PERMISSION_LIST_FAIL: "[Permission] Get Permission List fail"
// };
// export class GetPermissionListAction implements Action {
//   public readonly type = PermissionActionType.GET_PERMISSION_LIST;
//   constructor(public payload: string) {}
// }
// export class GetPermissionListActionSuccess implements Action {
//   public readonly type = PermissionActionType.GET_PERMISSION_LIST_SUCCESS;
//   constructor(public payload: PermissionState[]) {}
// }
// export class GetPermissionListActionFail implements Action {
//   public readonly type = PermissionActionType.GET_PERMISSION_LIST_FAIL;
//   constructor(public payload: any) {}
// }
// export type PermissionActions = 
// GetPermissionListAction |  
// GetPermissionListActionFail |
// GetPermissionListActionSuccess;


// export const addPermission = createAction(
//   '[Permission List] Add Permission',
//   props<{ subPermissionId: any }>()
// );

// export const removePermission = createAction(
//   '[Permission Collection] Remove Permission',
//   props<{ subPermissionId:any }>()
// );

// export const retrievedPermission = createAction(
//   '[Permission List/API] Retrieve Permissions Success',
//   props<{ PermissionModel: any }>()
// );

// export enum PermissionActionType {
//   ADD_ITEM = '[PermissionModel] Add PermissionModel',
// }

// export class PermissionActions implements Action {
//   readonly type!: PermissionActionType.ADD_ITEM;
//   constructor(public payload: PermissionModel) {}
// }

// export type PermissionAction = AddArticleAction;