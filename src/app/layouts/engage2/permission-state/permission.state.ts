import { empty } from "rxjs";

export interface PermissionModel {
    priviledge: string
}
export interface PermissionState {
    permissions: String
    loading: boolean
    error: string | null
}
export const initialPermissionState: PermissionState = {
    permissions: "",
    loading: false,
    error: null
};