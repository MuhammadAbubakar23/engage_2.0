import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PermissionState } from "./permission.state";

const getPermissionsState = createFeatureSelector<PermissionState>('permissions');
export const getPermissions=createSelector(getPermissionsState,(state)=>{
    console.log(state)
    return state.permissions;
})
export const getPermissionsLoading = createSelector(getPermissionsState, state => state.loading)

export const selectPermissionModels = (state: PermissionState) => state.permissions;
//export const getPermissionByParentId = (id:number) => createSelector(selectPermissionModels, (permissionModels:PermissionModel[]) => permissionModels.parentId );


export const getPermissionBySlug = (permition:string) => createSelector(getPermissions, (permissionModels:string) => {
  console.log("--------per-------"+permition+"--------per-------");
  console.log("--------per-------"+permissionModels+"--------per-------");
  return (permissionModels.includes(permition))?true:false;
   
});
