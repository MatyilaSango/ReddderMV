import { createAction, props } from "@ngrx/store"

export const storeTabMuneVissibilityAction = createAction('[PostsContainerComponent Component] store tab mune visibility', props<{vissibility: boolean}>())