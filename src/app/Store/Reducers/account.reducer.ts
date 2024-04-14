import { createReducer, on } from "@ngrx/store"
import { Account } from "../../types/types"
import { loadMoreAccount, storeAccount } from "../Actions/account.action"
import { STATES } from "src/app/enums/enums"

const initialAccount: Account = JSON.parse(localStorage.getItem(STATES.account) as string) || {
    name: "",
    type_: "",
    data: []
}

export const accountReducer = createReducer(
    initialAccount,
    on(storeAccount, (state: Account, payload) => {
        const newState = {...state, name: payload.name, type_: payload.type_, data: payload.data}
        localStorage.setItem(STATES.account, JSON.stringify(newState))
        return newState
    }),
    on(loadMoreAccount, (state: Account, payload) => {
        let newData = [...state.data]
        payload.data.forEach(post => {
            if(!JSON.stringify(newData).includes(post.link)) newData.push(post)
        })
        const newState = {...state, data: newData}
        localStorage.setItem(STATES.account, JSON.stringify(newState))
        return newState
    })
)