import { Action } from '@ngrx/store';
import { Category } from '../../models/category.model';

// load catalog
export const LOAD_BASE_CABINETS = '[Cabinets] Load Base Cabinets setup';
export const LOAD_BASE_CABINETS_FAIL = '[Cabinets] Load Base Cabinets setup Fail';
export const LOAD_BASE_CABINETS_SUCCESS = '[Cabinets] Load Base Cabinets setup Success';

export class LoadCabinetsBase implements Action {
  readonly type = LOAD_BASE_CABINETS;
}

export class LoadCabinetsBaseFail implements Action {
  readonly type = LOAD_BASE_CABINETS_FAIL;
  constructor(public payload: any) {}
}

export class LoadCabinetsBaseSuccess implements Action {
  readonly type = LOAD_BASE_CABINETS_SUCCESS;
  constructor(public payload: Category[]) {}
}

// create items
// update items
// delete items

// action types
export type CabinetsAction = LoadCabinetsBase | LoadCabinetsBaseFail | LoadCabinetsBaseSuccess;
