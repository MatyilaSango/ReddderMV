import { createAction, props } from "@ngrx/store"
import { SearchAccountState } from "../../types/types"

export const storeSearchAccount = createAction('[SearchComponent Component] StoreSearchAccount', props<SearchAccountState>())
