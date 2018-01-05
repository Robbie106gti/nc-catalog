import { Action } from '@ngrx/store';
import { Catalog } from '../../models/catalog.model';

// load catalog
export const LOAD_BASE = '[Catalog] Load Base setup';
export const LOAD_BASE_FAIL = '[Catalog] Load Base setup Fail';
export const LOAD_BASE_SUCCESS = '[Catalog] Load Base setup Success';

export class LoadBase implements Action {
  readonly type = LOAD_BASE;
}

export class LoadBaseFail implements Action {
  readonly type = LOAD_BASE_FAIL;
  constructor(public payload: any) {}
}

export class LoadBaseSuccess implements Action {
  readonly type = LOAD_BASE_SUCCESS;
  constructor(public payload: Catalog[]) {}
}

// create items
// update items
// delete items

// action types
export type CatalogAction = LoadBase | LoadBaseFail | LoadBaseSuccess;
