import { Action } from '@ngrx/store';

// load catalog
export const LOAD_EDIT = '[Edit] Edit is active';
export const UPDATE_TITLE = '[Edit] Update Title of item';
export const EDITED = '[Edit] Edit is done';

export const EDIT_SUCCESS = '[Edit] Edit is successively updated';
export const EDIT_FAIL = '[Edit] Edit Failed';

// create items
export class LoadEdit implements Action {
  readonly type = LOAD_EDIT;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

// update items
export class EditActive implements Action {
  readonly type = UPDATE_TITLE;
  constructor(public payload: any) {
    // console.log(payload);
  }
}
export class EditFail implements Action {
  readonly type = EDIT_FAIL;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

// delete items
export class Edited implements Action {
  readonly type = EDITED;
  constructor(public payload: any) {
    // console.log(payload);
  }
}
export class EditSuccess implements Action {
  readonly type = EDIT_SUCCESS;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

// action types
export type EditAction = LoadEdit | EditActive | Edited | EditFail | EditSuccess;
