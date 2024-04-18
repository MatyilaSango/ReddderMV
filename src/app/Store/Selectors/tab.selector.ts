import { createSelector } from "@ngrx/store"
import { AppState } from "../App"

const tabSelector = (state: AppState) => state.tab

export const selectTabMenuVissibility = createSelector(tabSelector, (state) => state.menuVisibility)