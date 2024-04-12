import { createAction, props } from "@ngrx/store"
import { Post } from "src/app/types/types"

export const savePost = createAction("['Post Component'] savePost", props<Post>())
export const deletePost = createAction("['Post Component'] deletePost", props<Post>())