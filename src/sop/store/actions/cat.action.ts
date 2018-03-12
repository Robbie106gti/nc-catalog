import { Action } from '@ngrx/store';

// load Categories SOP
export const LOAD_CAT = '[CAT] Load category SOP';
export const LOAD_CAT_FAIL = '[CAT] Load category SOP Fail';
export const LOAD_CAT_SUCCESS = '[Search] Load category SOP Success';

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
export const ADD_CAT_SUCCESS = '[Search] Add category SOP Success';

export class AddCatSuccess implements Action {
  readonly type = ADD_CAT_SUCCESS;
  constructor(public payload: any) {}
}

// update items
// delete items

// action types
export type CatAction = AddCatSuccess | LoadCat | LoadCatFail | LoadCatSuccess;
