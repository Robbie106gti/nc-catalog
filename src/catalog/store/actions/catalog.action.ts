import { Action } from '@ngrx/store';
import { Catalog } from '../../models/catalog.model';

// load catalog
export const LOAD_CATALOG = '[Catalog] Load Base Catalog setup';
export const LOAD_CATALOG_FAIL = '[Catalog] Load Base Catalog setup Fail';
export const LOAD_CATALOG_SUCCESS = '[Catalog] Load Base Catalog setup Success';

export class LoadCatalog implements Action {
  readonly type = LOAD_CATALOG;
}

export class LoadCatalogFail implements Action {
  readonly type = LOAD_CATALOG_FAIL;
  constructor(public payload: any) {}
}

export class LoadCatalogSuccess implements Action {
  readonly type = LOAD_CATALOG_SUCCESS;
  constructor(public payload: Catalog[]) {}
}

// create items
// update items
// delete items

// action types
export type CatalogAction = LoadCatalog | LoadCatalogFail | LoadCatalogSuccess;
