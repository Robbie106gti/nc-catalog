import { Action } from '@ngrx/store';

// load Categories SOP
export const LOAD_CAT = '[CAT] Load categories SOP';
export const LOAD_CAT_FAIL = '[CAT] Load categories SOP Fail';
export const LOAD_CAT_SUCCESS = '[CAT] Load categories SOP Success';

export class LoadCat implements Action {
  readonly type = LOAD_CAT;
}

export class LoadCatFail implements Action {
  readonly type = LOAD_CAT_FAIL;
  constructor(public payload: any) {}
}

export class LoadCatSuccess implements Action {
  readonly type = LOAD_CAT_SUCCESS;
  constructor(public payload: any) {}
}

// create items
export const ADD_CAT_SUCCESS = '[CAT] Add category SOP Success';

export class AddCatSuccess implements Action {
  readonly type = ADD_CAT_SUCCESS;
  constructor(public payload: any) {}
}

// update items
export const UPDATE_CAT_LOADED = '[CAT] Update category SOP loaded';
export const UPDATE_CAT_LOADING = '[CAT] Update category SOP loading';

export const UPDATE_CAT_TI = '[CAT] Update category SOP title & image';
export const UPDATE_CAT_TI_FAIL = '[CAT] Update category SOP title & image fail';
export const UPDATE_CAT_TI_SUCCESS = '[CAT] Update category SOP title & image success';

export class UpdateCatLoaded implements Action {
  readonly type = UPDATE_CAT_LOADED;
  constructor(public payload: any) {}
}
export class UpdateCatLoading implements Action {
  readonly type = UPDATE_CAT_LOADING;
  constructor(public payload: any) {}
}
export class UpdateCatTI implements Action {
  readonly type = UPDATE_CAT_TI;
  constructor(public payload: any) {}
}
export class UpdateCatTIfail implements Action {
  readonly type = UPDATE_CAT_TI_FAIL;
  constructor(public payload: any) {}
}
export class UpdateCatTIsuccess implements Action {
  readonly type = UPDATE_CAT_TI_SUCCESS;
  constructor(public payload: any) {}
}
// delete items

// action types
export type CatAction = AddCatSuccess | LoadCat | LoadCatFail | LoadCatSuccess | UpdateCatLoaded | UpdateCatLoading | UpdateCatTI | UpdateCatTIfail | UpdateCatTIsuccess;
