import { createReducer, on } from "@ngrx/store"
import { SearchAccountState } from "../../types/types"
import { storeSearchAccount } from "./search.actions"

const initialSearchAccountState: SearchAccountState = {
    name: "sas",
    type_: "sas",
    data: []
}

export const searchAccountReducer = createReducer(
    initialSearchAccountState,
    on(storeSearchAccount, (state: SearchAccountState, payload) => ({...state, name: payload.name, type: payload.type_, data: payload.data}))
)