import { createReducer, on } from "@ngrx/store"
import { deletePost, savePost } from "./bookmark.action"
import { Post } from "src/app/types/types"

const initalBookmark: Post[] = JSON.parse(localStorage.getItem("bookmark") as string) || []

export const bookmarkPostReducer = createReducer(
    initalBookmark,
    on(savePost, (state: Post[], payload: Post) => {
        if(!JSON.stringify(state).includes(JSON.stringify(payload))) return ([payload, ...state])
        return [...state]
    }),
    on(deletePost, (state: Post[], payload: Post) => {
        return [...state].filter(post => {
            const tmpPost: Post = {...post};
            // @ts-ignore
            delete tmpPost.type
            const tmpPayload: Post = {...payload};
            // @ts-ignore
            delete tmpPayload.type
            return (JSON.stringify(tmpPost) !== JSON.stringify(tmpPayload))
        })
    })
)