import { Store, createReducer, on } from "@ngrx/store"
import { SearchAccountState } from "../../types/types"
import { storeSearchAccount } from "./search.actions"

const initialSearchAccountState: SearchAccountState = JSON.parse(localStorage.getItem("searchAccount") as string) || {
    name: "",
    type_: "",
    data: []
}

export const searchAccountReducer = createReducer(
    initialSearchAccountState,
    on(storeSearchAccount, (state: SearchAccountState, payload) => ({...state, name: payload.name, type_: payload.type_, data: payload.data}))
)