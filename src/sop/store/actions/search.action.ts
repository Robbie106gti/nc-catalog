import { Action } from '@ngrx/store';

// load catalog
export const SEARCH_SOP = '[Sop Search] Load setup';
export const SEARCH_SOP_FAIL = '[Sop Search] Load setup Fail';
export const SEARCH_SOP_SUCCESS = '[Sop Search] Load setup Success';

export class Search implements Action {
  readonly type = SEARCH_SOP;
  constructor(public payload: any) {}
}

export class SearchFail implements Action {
  readonly type = SEARCH_SOP_FAIL;
  constructor(public payload: any) {}
}

export class SearchSuccess implements Action {
  readonly type = SEARCH_SOP_SUCCESS;
  constructor(public payload: { [id: string]: any }) {}
}

// create items
// update items
// delete items

// action types
export type SearchAction = Search | SearchFail | SearchSuccess;
