import { createReducer, on } from '@ngrx/store';
import { never } from 'rxjs';
import { loadPermissionsList, loadPermissionsListFail, loadPermissionsListSuccess } from './permission.actions';
import { initialPermissionState, PermissionState } from './permission.state';

const _permissionReducer = createReducer(
  initialPermissionState,
  // on(loadPermissionsListSuccess,(state,action)=>{
  //     return{
  //         ...state,
  //         permissions:action.permissions
  //     }
  // }),
  on(loadPermissionsList, (state): PermissionState => {
    return {
      ...state,
      loading: true
    }
  }),
  on(loadPermissionsListSuccess, (state, action): PermissionState => 
  {
    return {
      ...state,
      permissions: action.permissions,
      loading: false,
      error: ''
    }
  }),
  on(loadPermissionsListFail, (state, action): PermissionState => {
    return {
      ...state,
      permissions:"" ,
      loading:false,
      error: action.error
    }
  })
);
export function permissionReducer(state: any, action: any) {
  return _permissionReducer(state, action);
}















//import { createReducer, on, Action } from '@ngrx/store';
// import { GetPermissionListAction, retrievedPermission } from '../actions/permission.actions';
// import { retrievedBookList } from './books.actions';
// import { Book } from '../book-list/books.model';
// import { PermissionModel } from '../../model/left-permission';


// import { PermissionActions , GetPermissionListAction, PermissionActionType } from "./permission.actions"
// import { PermissionState } from './permission.state';

// const permissionInitialState = (function(): PermissionState {
//   const state: PermissionState = {
//     permission: []
//   };
//   return state;
// })();

// export function reducer(state = permissionInitialState, action: PermissionActions) {
//   switch (action.type) {
//     case PermissionActionType.GET_PERMISSION_LIST_SUCCESS: {
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
