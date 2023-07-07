import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MenuModel } from "./menu.model";
import { MenuState } from "./menu.state";

const getMenusState = createFeatureSelector<MenuState>('menus');
export const getMenus=createSelector(getMenusState,(state)=>{
    //// console.log(state)
    return state.menus;
})
export const getMenusLoading = createSelector(getMenusState, state => state.loading)

export const selectMenuModels = (state: MenuState) => state.menus;
//export const getMenuByParentId = (id:number) => createSelector(selectMenuModels, (menuModels:MenuModel[]) => menuModels.parentId );

export const getMenuById = (id:number) => createSelector(getMenus, (menuModels:MenuModel[]) => {
    if (menuModels) {
      return menuModels.filter((model) => model.parentId === id);
    } else {
      return {};
    }
  });

export const getEmarging = (emerging:string) => createSelector(getMenus, (menuModels:MenuModel[]) => {
    //// console.log(menuModels);
    if (menuModels) {
      return menuModels.filter((model) => model.emerging.includes(emerging));
    } else {
      return {};
    }
});
export const getEmargingEqual = (emerging:string) => createSelector(getMenus, (menuModels:MenuModel[]) => {
    // // console.log(menuModels);
    if (menuModels) {
      return menuModels.filter((model) => model.emerging.includes(emerging) && model.baseId === model.parentId );
    } else {
      return {};
    }
});
export const getEmargingNotEqual = (emerging:string) => createSelector(getMenus, (menuModels:MenuModel[]) => {
  // // console.log(menuModels);
  if (menuModels) {
    return menuModels.filter((model) => model.emerging.includes(emerging) && model.baseId !== model.parentId );
  } else {
    return {};
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