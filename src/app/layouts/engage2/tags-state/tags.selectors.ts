import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TagsModel } from "./tags.model";
import { TagsState } from "./tags.state";

const ConstTagsModelState:TagsModel[] = []
const getTagsState = createFeatureSelector<TagsState>('tagss');

export const getTags = createSelector(getTagsState,(state)=> state.tagss)
export const getTagsLoading = createSelector(getTagsState, state => state.loading)
export const selectTagsModels = (state: TagsState) => state.tagss;
export const getTagsById = (id:number) => createSelector(getTags, (tagsModels:TagsModel[]) => (tagsModels)?tagsModels.filter((model) => model.parentId === id):ConstTagsModelState);

export const getTagsByParentId = (id:number) => createSelector(getTags, (tagsModels:TagsModel[]) => (tagsModels)?tagsModels.filter((model) => model.parentId === id):ConstTagsModelState);

//export const getTagsByParentId = (id:number) => createSelector(selectTagsModels, (tagsModels:TagsModel[]) => tagsModels.parentId );
export const getEmarging = (emerging:string) => createSelector(getTags, (tagsModels:TagsModel[]) => (tagsModels)? tagsModels.filter((model) => model.emerging.includes(emerging)):ConstTagsModelState);
export const getInSubEmarging = (startString:string, endString:string) => createSelector(getTags, (tagsModels:TagsModel[]) => {
  //console.log(tagsModels);
  if (tagsModels) {
    return tagsModels.filter((model) => model.emerging.includes(startString) && model.emerging.includes(endString));
  } else {
    return ConstTagsModelState;
  }
});


export const getEmargingEqual = (emerging:string) => createSelector(getTags, (tagsModels:TagsModel[]) => {
    if (tagsModels) {
      return tagsModels.filter((model) => model.emerging.includes(emerging) && model.baseId === model.parentId );
    } else {
      return ConstTagsModelState;
    }
});
export const getEmargingNotEqual = (emerging:string) => createSelector(getTags, (tagsModels:TagsModel[]) => {
  if (tagsModels) {
    return tagsModels.filter((model) => model.emerging.includes(emerging) && model.baseId !== model.parentId );
  } else {
    return ConstTagsModelState;
  }
});