import { createSelector } from "@ngrx/store"
import { AppState } from "../App"

const accountSelector = (state: AppState) => state.account

export const selectAccount = createSelector(accountSelector, (state) => state.name)
export const selectType = createSelector(accountSelector, (state) => state.type_)
export const selectData = createSelector(accountSelector, (state) => state.data)