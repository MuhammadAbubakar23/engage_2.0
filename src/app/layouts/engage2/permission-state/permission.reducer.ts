import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { never } from 'rxjs';
//import { Action } from 'rxjs/internal/scheduler/Action';
import { loadPermissionsLetters, loadPermissionsLettersFail, loadPermissionsLettersSuccess, updatePermissionsLetters, updatePermissionsLettersFail, updatePermissionsLettersSuccess } from './permission.actions';
import { initialPermissionState, PermissionState } from './permission.state';

const _permissionReducer = createReducer(
  initialPermissionState,
  // on(loadPermissionsLettersSuccess,(state,action)=>{
  //     return{
  //         ...state,
  //         permissions:action.permissions
  //     }
  // }),
  on(loadPermissionsLetters, (state): PermissionState => {
    return {
      ...state,
      loading: true
    }
  }),
  on(loadPermissionsLettersSuccess, (state, action): PermissionState => 
  {
    return {
      ...state,
      permissions: action.permissions,
      loading: false,
      error: ''
    }
  }),
  on(loadPermissionsLettersFail, (state, action): PermissionState => {
    
    return {
      ...state,
     // permissions:null ,
      loading:false,
      error: action.error
    }
  }),
  on(updatePermissionsLetters, (state): PermissionState => ({  ...state, loading: true })),
  on(updatePermissionsLettersSuccess, (state, action): PermissionState => {
    // let a = state;
    // console.log(state);
    // console.log(action);
    let permis = state.permissions?.priviledge+action.permissions?.priviledge;
     
    return {
      ...state,
      permissions: permis,
      loading: true,
      error: null,
    };
  }),
  on(updatePermissionsLettersFail, (state, action): PermissionState => ({ ...state, loading: false, error: action.error }))
);
export function permissionReducer(state: PermissionState | undefined, action: Action) {//=initialPermissionState
  return _permissionReducer(state, action);
}















//import { createReducer, on, Action } from '@ngrx/store';
// import { GetPermissionLettersAction, retrievedPermission } from '../actions/permission.actions';
// import { retrievedBookLetters } from './books.actions';
// import { Book } from '../book-list/books.model';
// import { PermissionModel } from '../../model/left-permission';


// import { PermissionActions , GetPermissionLettersAction, PermissionActionType } from "./permission.actions"
// import { PermissionState } from './permission.state';

// const permissionInitialState = (function(): PermissionState {
//   const state: PermissionState = {
//     permission: []
//   };
//   return state;
// })();

// export function reducer(state = permissionInitialState, action: PermissionActions) {
//   switch (action.type) {
//     case PermissionActionType.GET_PERMISSION_LETTERS_SUCCESS: {
//       return Object.assign({}, state, { permission: action.payload });
//     }
//     default: {
//       return state;
//     }
//   }
// }







// export const initialState: ReadonlyArray<PermissionModel> = [];

// export const booksReducer = createReducer(
//   initialState,
//   on(retrievedPermission, (state, { PermissionModel }) => [...PermissionModel])
// );
