import { createSelector } from "@ngrx/store"
import { AppState } from "../App"

const searchAccountSelector = (state: AppState) => state.searchAccount

export const selectAccount = createSelector(searchAccountSelector, (state) => state.name)
export const selectType = createSelector(searchAccountSelector, (state) => state.type_)
export const selectData = createSelector(searchAccountSelector, (state) => state.data)