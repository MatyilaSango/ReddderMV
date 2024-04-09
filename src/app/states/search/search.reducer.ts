import { createReducer, on } from "@ngrx/store"
import { SearchAccountState } from "../../types/types"
import { loadMoreSearchAccount, storeSearchAccount } from "./search.actions"
import { STATES } from "src/app/enums/enums"

const initialSearchAccountState: SearchAccountState = JSON.parse(localStorage.getItem(STATES.searchAccount) as string) || {
    name: "",
    type_: "",
    data: []
}

export const searchAccountReducer = createReducer(
    initialSearchAccountState,
    on(storeSearchAccount, (state: SearchAccountState, payload) => {
        const newState = {...state, name: payload.name, type_: payload.type_, data: payload.data}
        localStorage.setItem(STATES.searchAccount, JSON.stringify(newState))
        return newState
    }),
    on(loadMoreSearchAccount, (state: SearchAccountState, payload) => {
        let newData = [...state.data]
        payload.data.forEach(post => {
            if(!JSON.stringify(newData).includes(post.link)) newData.push(post)
        })
        const newState = {...state, data: newData}
        localStorage.setItem(STATES.searchAccount, JSON.stringify(newState))
        return newState
    })
)