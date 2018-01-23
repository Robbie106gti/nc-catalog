import { Action } from '@ngrx/store';
import { Cabinets } from '../../models/cabinets.model';

// load catalog
export const LOAD_BC_CABINETS = '[Cabinets] Load Base Channel Cabinets setup';
export const LOAD_BC_CABINETS_FAIL = '[Cabinets] Load Base Channel Cabinets setup Fail';
export const LOAD_BC_CABINETS_SUCCESS = '[Cabinets] Load Base Channel Cabinets setup Success';

export class LoadBCCabinets implements Action {
  readonly type = LOAD_BC_CABINETS;
}

export class LoadBCCabinetsFail implements Action {
  readonly type = LOAD_BC_CABINETS_FAIL;
  constructor(public payload: any) {}
}

export class LoadBCCabinetsSuccess implements Action {
  readonly type = LOAD_BC_CABINETS_SUCCESS;
  constructor(public payload: Cabinets[]) {}
}

// create items
// update items
// delete items

// action types
export type BCCabinetsAction = LoadBCCabinets | LoadBCCabinetsFail | LoadBCCabinetsSuccess;
