export interface PermissionModel {
    priviledge: string
}
export interface PermissionState {
    permissions: string
    loading: boolean
    error: string
}
export const initialPermissionState: PermissionState = {
    permissions: '',
    loading: false,
    error: ''
};