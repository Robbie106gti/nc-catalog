import { Action } from '@ngrx/store';

// load Category SOP
export const LOAD_SOPS = '[SOP] Load SOP category';
export const LOAD_SOPS_FAIL = '[SOP] Load SOP category Fail';
export const LOAD_SOPS_SUCCESS = '[SOP] Load SOP category Success';

export class LoadSops implements Action {
  readonly type = LOAD_SOPS;
  constructor(public payload: any) {}
}

export class LoadSopsFail implements Action {
  readonly type = LOAD_SOPS_FAIL;
  constructor(public payload: any) {}
}

export class LoadSopsSuccess implements Action {
  readonly type = LOAD_SOPS_SUCCESS;
  constructor(public payload: any) {}
}

// create items
export const ADD_SOP = '[SOP] Add SOP to category';
export const ADD_SOP_SUCCESS = '[SOP] Add SOP to category Success';
export const ADD_SOP_FAIL = '[SOP] Add SOP to category Fail';

export class AddSop implements Action {
  readonly type = ADD_SOP;
  constructor(public payload: any) {}
}
export class AddSopSuccess implements Action {
  readonly type = ADD_SOP_SUCCESS;
  constructor(public payload: any) {}
}
export class AddSopFail implements Action {
  readonly type = ADD_SOP_FAIL;
  constructor(public payload: any) {}
}

// update items
export const UPDATE_SOP_TI = '[SOP] Update SOP title & image';
export const UPDATE_SOP_TI_FAIL = '[SOP] Update SOP title & image fail';
export const UPDATE_SOP_TI_SUCCESS = '[SOP] Update SOP title & image success';

export class UpdateSopTI implements Action {
  readonly type = UPDATE_SOP_TI;
  constructor(public payload: any) {}
}
export class UpdateSopTIfail implements Action {
  readonly type = UPDATE_SOP_TI_FAIL;
  constructor(public payload: any) {}
}
export class UpdateSopTIsuccess implements Action {
  readonly type = UPDATE_SOP_TI_SUCCESS;
  constructor(public payload: any) {}
}

// delete items

// action types
export type SopAction = AddSopSuccess | AddSop | AddSopFail | LoadSops | LoadSopsFail | LoadSopsSuccess | UpdateSopTI | UpdateSopTIfail | UpdateSopTIsuccess;
