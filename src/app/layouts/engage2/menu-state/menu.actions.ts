import { Action, createAction, props } from '@ngrx/store';
import { MenuModel } from './menu.model';
import { MenuState } from './menu.state';


export const LOAD_MENU_LIST = '[menu list] load menus';
export const LOAD_MENU_LIST_SUCCESS = '[menu list] load menus success';
export const LOAD_MENU_LIST_FAIL = '[menu list] load menus fail';
// export const UPDATE_MENU_LIST = '[menu list] update menus';
// export const UPDATE_MENU_LIST_SUCCESS = '[menu list] update menus success';
// export const UPDATE_MENU_LIST_FAIL = '[menu list] update menus fail';



export const loadMenusList = createAction(LOAD_MENU_LIST);
export const loadMenusListSuccess = createAction(LOAD_MENU_LIST_SUCCESS, props<{ menus: MenuModel[] }>());
export const loadMenusListFail = createAction(LOAD_MENU_LIST_FAIL, props<{ error: string | null }>());

// export const updateMenusList = createAction(UPDATE_MENU_LIST);
// export const updateMenusListSuccess = createAction(UPDATE_MENU_LIST_SUCCESS, props<{ menus: MenuModel[] }>());
// export const updateMenusListFail = createAction(UPDATE_MENU_LIST_FAIL, props<{ error: string | null }>());

// export const MenuActionType = {
//   GET_MENU_LIST: "[Menu] Get Menu List",
//   GET_MENU_LIST_SUCCESS: "[Menu] Get Menu List success",
//   GET_MENU_LIST_FAIL: "[Menu] Get Menu List fail"
// };
// export class GetMenuListAction implements Action {
//   public readonly type = MenuActionType.GET_MENU_LIST;
//   constructor(public payload: string) {}
// }
// export class GetMenuListActionSuccess implements Action {
//   public readonly type = MenuActionType.GET_MENU_LIST_SUCCESS;
//   constructor(public payload: MenuState[]) {}
// }
// export class GetMenuListActionFail implements Action {
//   public readonly type = MenuActionType.GET_MENU_LIST_FAIL;
//   constructor(public payload: any) {}
// }
// export type MenuActions = 
// GetMenuListAction |  
// GetMenuListActionFail |
// GetMenuListActionSuccess;


// export const addMenu = createAction(
//   '[Menu List] Add Menu',
//   props<{ subMenuId: any }>()
// );

// export const removeMenu = createAction(
//   '[Menu Collection] Remove Menu',
//   props<{ subMenuId:any }>()
// );

// export const retrievedMenu = createAction(
//   '[Menu List/API] Retrieve Menus Success',
//   props<{ MenuModel: any }>()
// );

// export enum MenuActionType {
//   ADD_ITEM = '[MenuModel] Add MenuModel',
// }

// export class MenuActions implements Action {
//   readonly type!: MenuActionType.ADD_ITEM;
//   constructor(public payload: MenuModel) {}
// }

// export type MenuAction = AddArticleAction;