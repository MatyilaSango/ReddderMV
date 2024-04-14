import { createReducer, on } from "@ngrx/store"
import { SearchAccount } from "../../types/types"
import { STATES } from "src/app/enums/enums"
import { storeSearchedAccountsFound } from "../Actions/search.action"

const initialAccount: SearchAccount = JSON.parse(localStorage.getItem(STATES.searchAccounts) as string) || {
    accounts: []
}

export const searchAccountsReducer = createReducer(
    initialAccount,
    on(storeSearchedAccountsFound, (state: SearchAccount, payload) => {
        const newState: SearchAccount = {...state, accounts: payload.accounts}
        localStorage.setItem(STATES.searchAccounts, JSON.stringify(newState))
        return newState
    })
)