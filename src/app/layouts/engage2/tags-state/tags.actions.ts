import { Action, createAction, props } from '@ngrx/store';
import { TagsModel } from './tags.model';
import { TagsState } from './tags.state';


export const LOAD_MENU_LIST = '[tags list] load tagss';
export const LOAD_MENU_LIST_SUCCESS = '[tags list] load tagss success';
export const LOAD_MENU_LIST_FAIL = '[tags list] load tagss fail';

export const UPDATE_MENU_LIST = '[tags list] update tagss';
export const UPDATE_MENU_LIST_SUCCESS = '[tags list] update tagss success';
export const UPDATE_MENU_LIST_FAIL = '[tags list] update tagss fail';



export const loadTagsList = createAction(LOAD_MENU_LIST);
export const loadTagsListSuccess = createAction(LOAD_MENU_LIST_SUCCESS, props<{ tagss: TagsModel[] }>());
export const loadTagsListFail = createAction(LOAD_MENU_LIST_FAIL, props<{ error: string | null }>());

export const updateTagsList = createAction(UPDATE_MENU_LIST);
export const updateTagsListSuccess = createAction(UPDATE_MENU_LIST_SUCCESS, props<{ tagss: TagsModel[] }>());
export const updateTagsListFail = createAction(UPDATE_MENU_LIST_FAIL, props<{ error: string | null }>());