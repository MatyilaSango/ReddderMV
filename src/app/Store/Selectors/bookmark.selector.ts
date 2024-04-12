import { createSelector } from "@ngrx/store"
import { AppState } from "../App"

const bookmarkStateSelector = (state: AppState) => state.bookmarks

export const selectBookmarkPosts = createSelector(bookmarkStateSelector, (state) => state)