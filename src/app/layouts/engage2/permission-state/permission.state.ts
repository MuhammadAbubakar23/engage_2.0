export interface PermissionModel {
    priviledge: string
}
export interface PermissionState {
    permissions: string | null
    loading: boolean
    error: string | null
}
export const initialPermissionState: PermissionState = {
    permissions: null,
    loading: false,
    error: null
};