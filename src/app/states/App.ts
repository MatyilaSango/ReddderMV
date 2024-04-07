import { Post, SearchAccountState } from "../types/types";

export interface AppState {
    searchAccount: SearchAccountState
    bookmarks: Post[]
}