import { Action } from '@ngrx/store';

// load catalog
export const SEARCH = '[Search] Load search';
export const SEARCH_FAIL = '[Search] Search Fail';
export const SEARCH_SUCCESS = '[Search] Search Success';

export class Search implements Action {
  readonly type = SEARCH;
  constructor(public payload: any) {
    console.log(payload);
  }
}

export class SearchFail implements Action {
  readonly type = SEARCH_FAIL;
  constructor(public payload: any) {}
}

export class SearchSuccess implements Action {
  readonly type = SEARCH_SUCCESS;
  constructor(public payload: { [id: string]: any }) {}
}

// create items
// update items
// delete items

// action types
export type SearchAction = Search | SearchFail | SearchSuccess;
