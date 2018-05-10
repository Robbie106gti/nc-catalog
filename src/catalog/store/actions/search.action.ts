import { Action } from '@ngrx/store';

// load catalog
export const SEARCH = '[Search] Load search';
export const SEARCH_FAIL = '[Search] Search Fail';
export const SEARCH_SUCCESS = '[Search] Search Success';

export const MODAL = '[Modal] Update image modal state';

export const FILTER = '[Filter] Filter set';
export const FILTER_MAT = '[Filter] Update Filter materials';

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
export class Modal implements Action {
  readonly type = MODAL;
  constructor(public payload: boolean) {
    console.log(payload);
  }
}

export class Filter implements Action {
  readonly type = FILTER;
  constructor(public payload: boolean) {}
}

export class FilterMat implements Action {
  readonly type = FILTER_MAT;
  constructor(public payload: any) {}
}
// delete items

// action types
export type SearchAction = Search | SearchFail | SearchSuccess | Modal | Filter | FilterMat;
