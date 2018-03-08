import { Action } from '@ngrx/store';

// load catalog
export const SEARCH = '[Search] Load setup';
export const SEARCH_FAIL = '[Search] Load setup Fail';
export const SEARCH_SUCCESS = '[Search] Load setup Success';

export class Search implements Action {
  readonly type = SEARCH;
  constructor(public payload: any) {}
}

export class SearchFail implements Action {
  readonly type = SEARCH_FAIL;
  constructor(public payload: any) {}
}

export class SearchSuccess implements Action {
  readonly type = SEARCH_SUCCESS;
  constructor(public payload: {[id: string]: any}) {}
}

// create items
// update items
// delete items

// action types
export type SearchAction = Search | SearchFail | SearchSuccess;
