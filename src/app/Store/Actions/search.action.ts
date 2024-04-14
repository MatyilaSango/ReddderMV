import { createAction, props } from "@ngrx/store"
import { SearchAccount } from "../../types/types"

export const storeSearchedAccountsFound = createAction('[SearchComponent Component] storeSearchedAccountsFound', props<SearchAccount>())
