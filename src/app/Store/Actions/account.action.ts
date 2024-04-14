import { createAction, props } from "@ngrx/store"
import { Account } from "../../types/types"

export const storeAccount = createAction('[SearchComponent Component] StoreAccount', props<Account>())
export const loadMoreAccount = createAction('[PostsContainer Component] LoadMoreAccount', props<Account>())
