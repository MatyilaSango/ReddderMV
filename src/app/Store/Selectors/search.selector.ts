import { createSelector } from "@ngrx/store"
import { AppState } from "../App"

const searchAccountSelector = (state: AppState) => state.searchAccounts

export const selectSearchedAccounts = createSelector(searchAccountSelector, (state) => state)
