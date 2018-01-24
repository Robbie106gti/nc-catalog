import { Action } from '@ngrx/store';
import { Cabinets } from '../../models/cabinets.model';

// load catalog
export const LOAD_CABINETS = '[Cabinets] Load Cabinets setup';
export const LOAD_CABINETS_FAIL = '[Cabinets] Load Cabinets setup Fail';
export const LOAD_CABINETS_SUCCESS = '[Cabinets] Load Cabinets setup Success';

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
  constructor(public payload: Cabinets[]) {
    // console.log(payload);
  }
}

// create items
// update items
// delete items

// action types
export type CabinetsAction = LoadCabinets | LoadCabinetsFail | LoadCabinetsSuccess;
