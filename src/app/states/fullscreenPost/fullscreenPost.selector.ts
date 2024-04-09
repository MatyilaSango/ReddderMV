import { createSelector } from "@ngrx/store"
import { AppState } from "../App"
import { Post } from "src/app/types/types"

const fullscreenPostSelector = (state: AppState) => state.fullscreenPost

export const selectPostOnFullscreen = createSelector(fullscreenPostSelector, (state: Post) => state)