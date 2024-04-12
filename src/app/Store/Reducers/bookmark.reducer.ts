import { createReducer, on } from "@ngrx/store"
import { deletePost, savePost } from "../Actions/bookmark.action"
import { Post } from "src/app/types/types"
import { STATES } from "src/app/enums/enums"

const initalBookmark: Post[] = JSON.parse(localStorage.getItem(STATES.bookmarks) as string) || []

export const bookmarkPostReducer = createReducer(
    initalBookmark,
    on(savePost, (state: Post[], payload: Post) => {
        const bookmarks = !JSON.stringify(state).includes(JSON.stringify(payload)) ? [payload, ...state] : [...state]
        localStorage.setItem(STATES.bookmarks, JSON.stringify(bookmarks))
        return bookmarks
    }),
    on(deletePost, (state: Post[], payload: Post) => {
        const bookmarks = [...state].filter(post => {
            const tmpPost: Post = {...post};
            // @ts-ignore
            delete tmpPost.type
            const tmpPayload: Post = {...payload};
            // @ts-ignore
            delete tmpPayload.type
            return (JSON.stringify(tmpPost) !== JSON.stringify(tmpPayload))
        })
        localStorage.setItem(STATES.bookmarks, JSON.stringify(bookmarks))
        return bookmarks
    })
)