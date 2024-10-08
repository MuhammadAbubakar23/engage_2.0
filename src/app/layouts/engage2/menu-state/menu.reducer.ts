import { Action, createReducer, on } from '@ngrx/store';
import { never } from 'rxjs';
import { loadMenusList, loadMenusListFail, loadMenusListSuccess } from './menu.actions';
import { MenuModel } from './menu.model';
import { initialMenuState, MenuState } from './menu.state';

const _menuReducer = createReducer(
  initialMenuState,
  // on(loadMenusListSuccess,(state,action)=>{
  //     return{
  //         ...state,
  //         menus:action.menus
  //     }
  // }),
  on(loadMenusList, (state): MenuState => {
    return {
      ...state,
      loading: true
    }
  }),
  on(loadMenusListSuccess, (state, action): MenuState => 
  {
    if(state.menus.length > 0){
      action.menus.forEach(function (menu:MenuModel) {
        state.menus.push(menu);
        
      })
    }
    // //ages.filter()
    return {
      ...state,
      menus: action.menus,
      loading: false,
      error: ''
    }
  }),
  on(loadMenusListFail, (state, action): MenuState => {
    return {
      ...state,
    //  menus: [],
      loading:false,
      error: action.error
    }
  }),


  // on(updateMenusList, (state): MenuState => ({  ...state, loading: true })),
  // on(updateMenusListSuccess, (state, action): MenuState => {
    
  //   //let AllAct$ = [...state.menus, ...action.menus];    
  //   let AllAct$ = [...state.menus, ...action.menus].filter((value, index, self) =>
  //     index === self.findIndex((t) => (
  //       t.mainId === value.mainId && t.name === value.name
  //     ))
  //   )
  //   return {
  //     ...state,
  //     menus: AllAct$, //[...state.menus, ...action.menus],
  //     loading: true,
  //     error: null,
  //   };
  // }),
  // on(updateMenusListFail, (state, action) => ({ ...state, loading: false, error: action.error }))


);
export function menuReducer(state: MenuState | undefined, action: Action) {
  return _menuReducer(state, action);
}















//import { createReducer, on, Action } from '@ngrx/store';
// import { GetMenuListAction, retrievedMenu } from '../actions/menu.actions';
// import { retrievedBookList } from './books.actions';
// import { Book } from '../book-list/books.model';
// import { MenuModel } from '../../model/left-menu';


// import { MenuActions , GetMenuListAction, MenuActionType } from "./menu.actions"
// import { MenuState } from './menu.state';

// const menuInitialState = (function(): MenuState {
//   const state: MenuState = {
//     menu: []
//   };
//   return state;
// })();

// export function reducer(state = menuInitialState, action: MenuActions) {
//   switch (action.type) {
//     case MenuActionType.GET_MENU_LIST_SUCCESS: {
//       return Object.assign({}, state, { menu: action.payload });
//     }
//     default: {
//       return state;
//     }
//   }
// }







// export const initialState: ReadonlyArray<MenuModel> = [];

// export const booksReducer = createReducer(
//   initialState,
//   on(retrievedMenu, (state, { MenuModel }) => [...MenuModel])
// );
