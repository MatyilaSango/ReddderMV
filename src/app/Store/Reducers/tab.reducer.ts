import { createReducer, on } from "@ngrx/store"
import { Tab } from "src/app/types/types"
import { storeTabMuneVissibilityAction } from "../Actions/tab.action"

const initialTabState: Tab = {
    menuVisibility: true
}

export const tabReducer = createReducer(
    initialTabState,
    on(storeTabMuneVissibilityAction, (state: Tab, payload) => ({...state, menuVisibility: payload.vissibility}))
)