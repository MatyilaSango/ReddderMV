import { createReducer, on } from "@ngrx/store"
import { deletePost, savePost } from "./bookmark.action"
import { Post } from "src/app/types/types"

const initalBookmark: Post[] = JSON.parse(localStorage.getItem("bookmark") as string) || []

export const bookmarkPostReducer = createReducer(
    initalBookmark,
    on(savePost, (state: Post[], payload: Post) => ([payload, ...state])),
    on(deletePost, (state: Post[], payload: Post) => {
        return [...state].filter(post => (JSON.stringify(post) !== JSON.stringify(payload)))
    })
)