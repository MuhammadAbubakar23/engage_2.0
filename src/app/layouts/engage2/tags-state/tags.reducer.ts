import { Action, createReducer, on } from '@ngrx/store';
import { loadTagsList, loadTagsListFail, loadTagsListSuccess, updateTagsList, updateTagsListFail, updateTagsListSuccess } from './tags.actions';
import { TagsModel } from './tags.model';
import { initialTagsState, TagsState } from './tags.state';

const _tagsReducer = createReducer(
  initialTagsState,
  on(loadTagsList, (state): TagsState => {
    return {
      ...state,
      loading: true
    }
  }),
  on(loadTagsListSuccess, (state, action): TagsState => 
  {
    if(state.tagss.length > 0){
      action.tagss.forEach(function (tags:TagsModel) {
        state.tagss.push(tags);
        
      })
    }
   
    return {
      ...state,
      tagss: action.tagss,
      loading: false,
      error: ''
    }
  }),
  on(loadTagsListFail, (state, action): TagsState => {
    return {
      ...state,
    //  tagss: [],
      loading:false,
      error: action.error
    }
  }),


  on(updateTagsList, (state): TagsState => ({  ...state, loading: true })),
  on(updateTagsListSuccess, (state, action): TagsState => {
 
    let AllAct$ = [...state.tagss, ...action.tagss].filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.mainId === value.mainId && t.name === value.name
      ))
    )
    return {
      ...state,
      tagss: AllAct$, //[...state.tagss, ...action.tagss],
      loading: true,
      error: null,
    };
  }),
  on(updateTagsListFail, (state, action) => ({ ...state, loading: false, error: action.error }))


);
export function tagsReducer(state: TagsState | undefined, action: Action) {
  return _tagsReducer(state, action);
}
