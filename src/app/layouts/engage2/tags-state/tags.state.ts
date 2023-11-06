import { TagsModel } from "./tags.model";

export interface TagsState {
    tagss: TagsModel[]
    loading: boolean
    error: string | null
}
export const initialTagsState: TagsState = {
    tagss: [],
    loading: false,
    error: null
};