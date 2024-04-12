import { createReducer, on } from "@ngrx/store"
import { Post } from "src/app/types/types"
import { addPostForFullscreenView, deletePostOnFullscreenView } from "../Actions/fullscreenPost.action"
import { STATES } from "src/app/enums/enums"

const initialPostOnFullscreen: Post = JSON.parse(localStorage.getItem(STATES.fullscreenPost) as string) || {} as Post

export const fullscreenPostReducer = createReducer(
    initialPostOnFullscreen,
    on(addPostForFullscreenView, (state: Post, payload) => {
        localStorage.setItem(STATES.fullscreenPost, JSON.stringify(payload))
        return payload
    }),
    on(deletePostOnFullscreenView, (state: Post, payload) => {
        localStorage.setItem(STATES.fullscreenPost, JSON.stringify({}))
        return payload
    })
)