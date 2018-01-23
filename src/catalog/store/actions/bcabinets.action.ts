import { Action } from '@ngrx/store';
import { Cabinets } from '../../models/cabinets.model';

// load catalog
export const LOAD_B_CABINETS = '[Cabinets] Load Base Cabinets setup';
export const LOAD_B_CABINETS_FAIL = '[Cabinets] Load Base Cabinets setup Fail';
export const LOAD_B_CABINETS_SUCCESS = '[Cabinets] Load Base Cabinets setup Success';

export class LoadBCabinets implements Action {
  readonly type = LOAD_B_CABINETS;
}

export class LoadBCabinetsFail implements Action {
  readonly type = LOAD_B_CABINETS_FAIL;
  constructor(public payload: any) {}
}

export class LoadBCabinetsSuccess implements Action {
  readonly type = LOAD_B_CABINETS_SUCCESS;
  constructor(public payload: Cabinets[]) {}
}

// create items
// update items
// delete items

// action types
export type BCabinetsAction = LoadBCabinets | LoadBCabinetsFail | LoadBCabinetsSuccess;
