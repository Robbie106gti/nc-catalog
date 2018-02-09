import { Action } from '@ngrx/store';
import { Cabinets } from '../../models/cabinets.model';

// load catalog
export const LOAD_CABINETS = '[Cabinets] Load Cabinets setup';
export const LOAD_CABINETS_FAIL = '[Cabinets] Load Cabinets setup Fail';
export const LOAD_CABINETS_SUCCESS = '[Cabinets] Load Cabinets setup Success';

export const CREATE_EDIT_CAB = '[Cabinet] Create to Edit Cabinet';
export const CREATE_EDIT_CAB_DEL = '[Cabinet] Delete to Edit Cabinet';

export class LoadCabinets implements Action {
  readonly type = LOAD_CABINETS;
  constructor(public payload: string) {
    // console.log(payload);
  }
}

export class LoadCabinetsFail implements Action {
  readonly type = LOAD_CABINETS_FAIL;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class LoadCabinetsSuccess implements Action {
  readonly type = LOAD_CABINETS_SUCCESS;
  constructor(public payload: any) {
   // console.log(payload);
  }
}

// create items
export class CreateEditCab implements Action {
  readonly type = CREATE_EDIT_CAB;
  constructor(public payload: any) {
    console.log(payload);
  }
}
// update items
// delete items
export class CreateEditCabDel implements Action {
  readonly type = CREATE_EDIT_CAB_DEL;
  constructor(public payload: any) {
    console.log(payload);
  }
}

// action types
export type CabinetsAction = LoadCabinets | LoadCabinetsFail | LoadCabinetsSuccess |
CreateEditCab | CreateEditCabDel;
