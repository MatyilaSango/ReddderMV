import { createAction, props } from "@ngrx/store"
import { SearchAccountState } from "../../types/types"

export const storeSearchAccount = createAction('[Search Component] StoreSearchAccount', props<SearchAccountState>())
