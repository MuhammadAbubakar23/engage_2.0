
export interface PermissionModel {
    priviledge: string
}
export interface PermissionState {
    permissions: PermissionModel|any
    loading: boolean
    error: string | null
}
export const initialPermissionState: PermissionState = {
    permissions: "",
    loading: false,
    error: null
};