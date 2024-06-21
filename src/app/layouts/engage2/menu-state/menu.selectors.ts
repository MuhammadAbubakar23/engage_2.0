import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MenuModel } from "./menu.model";
import { MenuState } from "./menu.state";

const ConstMenuModelState:MenuModel[] = []
const getMenusState = createFeatureSelector<MenuState>('menus');

export const getMenus = createSelector(getMenusState,(state)=> state.menus)
export const getMenusLoading = createSelector(getMenusState, state => state.loading)
export const selectMenuModels = (state: MenuState) => state.menus;
export const getMenuById = (id:number) => createSelector(getMenus, (menuModels:MenuModel[]) => (menuModels)?menuModels.filter((model) => model.parentId === id):ConstMenuModelState);
//export const getMenuByParentId = (id:number) => createSelector(selectMenuModels, (menuModels:MenuModel[]) => menuModels.parentId );
export const getEmarging = (emerging:string) => createSelector(getMenus, (menuModels:MenuModel[]) => (menuModels)? menuModels.filter((model) => model.emerging.includes(emerging)):ConstMenuModelState);
export const getInSubEmarging = (startString:string, endString:string) => createSelector(getMenus, (menuModels:MenuModel[]) => {
  if (menuModels) {
    return menuModels.filter((model) => model.emerging.includes(startString) && model.emerging.includes(endString));
  } else {
    return ConstMenuModelState;
  }
});
export const getEmargingEqual = (emerging:string) => createSelector(getMenus, (menuModels:MenuModel[]) => {
    if (menuModels) {
      return menuModels.filter((model) => model.emerging.includes(emerging) && model.baseId === model.parentId );
    } else {
      return ConstMenuModelState;
    }
});
export const getEmargingNotEqual = (emerging:string) => createSelector(getMenus, (menuModels:MenuModel[]) => {
  if (menuModels) {
    return menuModels.filter((model) => model.emerging.includes(emerging) && model.baseId !== model.parentId );
  } else {
    return ConstMenuModelState;
  }
});

// export const selectMainMenu = createSelector(
//     getMenusState,
//     selectAllBooks,
//     (selectedUser: User, allBooks: Book[]) => {
//       if (selectedUser && allBooks) {
//         return allBooks.filter((book: Book) => book.userId === selectedUser.id);
//       } else {
//         return allBooks;
//       }
//     }
//   );

// const allItems = (state: AppState) => state.clothingItems;
// const shoppingCart = (state: AppState) => state.shoppingCart;
//const cartIds = createSelector(shoppingCart, cart => cart.map(item => item.id));
// const clothingItems = createSelector(
//   getMenusState,
//   cartIds,
//   (items, cart) => items.map(item => ({
//     ...item,
//     isInShoppingCart: cart.includes(item.id),
//   }),
// );


// export interface State extends AppState.State {
//   members: MemberState
// }
// import { createFeatureSelector, createSelector } from "@ngrx/store";
// import { MenuModel } from "../../model/left-menu";
// import { MenuState } from "./menu.state";
// export const getMenuState = createFeatureSelector<MenuState>("menu");
// export const getMenuList = createSelector(
//   getMenuState,
//   (state: MenuState): MenuModel[] => state.menu
// );
// export const selectMenus = createSelector(
//   (state: EmitterState) => state.submenu,
//   (submenus: Array<MenuModel>) => submenus
// );
// export const selectCollectionState = createFeatureSelector<
//     EmitterState,
//   ReadonlyArray<string>
// >("collection");
// export const selectBookCollection = createSelector(
//   selectBooks,
//   selectCollectionState,
//   (books: Array<Book>, collection: Array<string>) => {
//     return collection.map((id) => books.find((book) => book.id === id));
//   }
// );