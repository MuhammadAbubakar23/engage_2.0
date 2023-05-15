import { MenuModel } from "./menu.model";

export interface MenuState {
    menus: MenuModel[]
    loading: boolean
    error: string | null
}
export const initialMenuState: MenuState = {
    menus: [],
    loading: false,
    error: null
};