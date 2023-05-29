import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PermissionModel, PermissionState } from "./permission.state";

const getPermissionsState = createFeatureSelector<PermissionState>('permissions');

export const getPermissions = createSelector(getPermissionsState, state => state.permissions);
export const getPermissionsLoading = createSelector(getPermissionsState, state => state.loading);
export const getPermissionsError = createSelector(getPermissionsState, state => state.error);

// export const getPermissions = createSelector(getPermissionsState, (state: PermissionState ) => state.error)
// export const selectPermissionModels = (state: PermissionState) => state.permissions;
// export const getPermissionByParentId = (id:number) => createSelector(selectPermissionModels, (permissionModels:PermissionModel[]) => permissionModels.parentId );


export const getPermissionBySlug = (permition:string) => createSelector(getPermissions, (permissions: String) => {
  console.log("--------per-------"+permition+"--------per-------");
  console.log("--------per-------"+permissions+"--------per-------");
  return (permissions?.includes(permition))?true:false;
   
});
