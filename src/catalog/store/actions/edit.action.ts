import { Action } from '@ngrx/store';

// load catalog
export const LOAD_EDIT = '[Edit] Load Edit Item';
export const EDIT_ACTIVE = '[Edit] Edit is active';
export const EDITED = '[Edit] Edit is done';

export class LoadEdit implements Action {
  readonly type = LOAD_EDIT;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class EditActive implements Action {
  readonly type = EDIT_ACTIVE;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class Edited implements Action {
  readonly type = EDITED;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

// create items
// update items
// delete items

// action types
export type EditAction = LoadEdit | EditActive | Edited;
