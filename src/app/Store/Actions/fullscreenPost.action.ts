import { createAction, props } from "@ngrx/store"
import { Post } from "src/app/types/types"

export const addPostForFullscreenView = createAction('[Post Component] addPostForFullscreenView', props<Post>())
export const deletePostOnFullscreenView = createAction('[Post Component] deletePostOnFullscreenView', props<Post>())