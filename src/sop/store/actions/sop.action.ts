import { Action } from '@ngrx/store';

// load Category SOP
export const LOAD_SOPS = '[SOP] Load SOP category';
export const LOAD_SOPS_FAIL = '[SOP] Load SOP category Fail';
export const LOAD_SOPS_SUCCESS = '[SOP] Load SOP category Success';
export const LOAD_SOPS_UPDATE = '[SOP] Load SOP category need updating';

export class LoadSops implements Action {
  readonly type = LOAD_SOPS;
  constructor(public payload: any) { }
}
export class LoadSopsUpdate implements Action {
  readonly type = LOAD_SOPS_UPDATE;
  constructor(public payload: any) {
    console.log('Updated needed')
  }
}

export class LoadSopsFail implements Action {
  readonly type = LOAD_SOPS_FAIL;
  constructor(public payload: any) { }
}

export class LoadSopsSuccess implements Action {
  readonly type = LOAD_SOPS_SUCCESS;
  constructor(public payload: any) { }
}

// create items
export const ADD_SOP = '[SOP] Add SOP to category';
export const ADD_SOP_SUCCESS = '[SOP] Add SOP to category Success';
export const ADD_SOP_FAIL = '[SOP] Add SOP to category Fail';

export class AddSop implements Action {
  readonly type = ADD_SOP;
  constructor(public payload: any) { }
}
export class AddSopSuccess implements Action {
  readonly type = ADD_SOP_SUCCESS;
  constructor(public payload: any) { }
}
export class AddSopFail implements Action {
  readonly type = ADD_SOP_FAIL;
  constructor(public payload: any) { }
}

export const ADD_TO_SOP = '[SOP] Add item to SOP';
export const ADD_TO_SOP_FAIL = '[SOP] Add item to SOP Fail';
export const ADD_TO_SOP_SUCCESS = '[SOP] Add item to SOP Success';

export class AddToSop implements Action {
  readonly type = ADD_TO_SOP;
  constructor(public payload: any) { }
}
export class AddToSopSuccess implements Action {
  readonly type = ADD_TO_SOP_SUCCESS;
  constructor(public payload: any) {
    // console.log(payload);
  }
}
export class AddToSopFail implements Action {
  readonly type = ADD_TO_SOP_FAIL;
  constructor(public payload: any) { }
}

// update items
export const UPDATE_SOP_TI = '[SOP] Update SOP title & image';
export const UPDATE_SOP_TI_FAIL = '[SOP] Update SOP title & image fail';
export const UPDATE_SOP_TI_SUCCESS = '[SOP] Update SOP title & image success';

export class UpdateSopTI implements Action {
  readonly type = UPDATE_SOP_TI;
  constructor(public payload: any) { }
}
export class UpdateSopTIfail implements Action {
  readonly type = UPDATE_SOP_TI_FAIL;
  constructor(public payload: any) { }
}
export class UpdateSopTIsuccess implements Action {
  readonly type = UPDATE_SOP_TI_SUCCESS;
  constructor(public payload: any) { }
}

// move item
export const SOP_TABLE_REMOVE = '[SOP] Remove table from SOP';
export const SOP_TABLE_REMOVE_SUCCESS = '[SOP] Remove table from SOP success';
export const SOP_TABLE_REMOVE_FAIL = '[SOP] Remove table from SOP fail';

export class RemoveTableFromSop implements Action {
  readonly type = SOP_TABLE_REMOVE;
  constructor(public payload: any) {
  }
}
export class RemoveTableFromSopSuccess implements Action {
  readonly type = SOP_TABLE_REMOVE_SUCCESS;
  constructor(public payload: any) {
  }
}
export class RemoveTableFromSopFail implements Action {
  readonly type = SOP_TABLE_REMOVE_FAIL;
  constructor(public payload: any) {
  }
}

// move item
export const MOVE_SOP = '[SOP] Move SOP to other Category';
export const MOVE_SOP_FAIL = '[SOP] Move SOP to other Category fail';
export const MOVE_SOP_SUCCESS = '[SOP] Move SOP to other Category success';

export class MoveSop implements Action {
  readonly type = MOVE_SOP;
  constructor(public payload: any) {
  }
}
export class MoveSopFail implements Action {
  readonly type = MOVE_SOP_FAIL;
  constructor(public payload: any) { }
}
export class MoveSopSuccess implements Action {
  readonly type = MOVE_SOP_SUCCESS;
  constructor(public payload: any) { }
}

// Move delete process
export const MOVE_SOP_DELETE = '[SOP] Move SOP delete';
export const MOVE_SOP_DELETE_FAIL = '[SOP] Move SOP delete fail';
export const MOVE_SOP_DELETE_SUCCESS = '[SOP] Move SOP delete success';

export class MoveSopDelete implements Action {
  readonly type = MOVE_SOP_DELETE;
  constructor(public payload: any) { }
}
export class MoveSopDeleteFail implements Action {
  readonly type = MOVE_SOP_DELETE_FAIL;
  constructor(public payload: any) { }
}
export class MoveSopDeleteSuccess implements Action {
  readonly type = MOVE_SOP_DELETE_SUCCESS;
  constructor(public payload: any) { }
}

// delete items
export const SOP_DELETE = '[SOP] SOP delete';
export const SOP_DELETE_SUCCESS = '[SOP] SOP delete success';
export const SOP_DELETE_FAIL = '[SOP] SOP delete fail';

export class SopDelete implements Action {
  readonly type = SOP_DELETE;
  constructor(public payload: any) { }
}
export class SopDeletefail implements Action {
  readonly type = SOP_DELETE_FAIL;
  constructor(public payload: any) { }
}
export class SopDeletesuccess implements Action {
  readonly type = SOP_DELETE_SUCCESS;
  constructor(public payload: any) { }
}

// action types
export type SopAction =
  | AddSopSuccess
  | AddSop
  | AddSopFail
  | LoadSops
  | LoadSopsUpdate
  | LoadSopsFail
  | LoadSopsSuccess
  | UpdateSopTI
  | UpdateSopTIfail
  | UpdateSopTIsuccess
  | MoveSop
  | MoveSopFail
  | MoveSopSuccess
  | MoveSopDelete
  | MoveSopDeleteFail
  | MoveSopDeleteSuccess
  | SopDelete
  | SopDeletefail
  | SopDeletesuccess
  | RemoveTableFromSop
  | RemoveTableFromSopFail
  | RemoveTableFromSopSuccess;
