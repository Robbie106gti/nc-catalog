import { Action } from '@ngrx/store';
import { Categories } from '../../models/categories.model';

// load catalog
export const LOAD_CATEGORIES = '[Categories] Load Categories setup';
export const LOAD_CATEGORIES_FAIL = '[Categories] Load Categories setup Fail';
export const LOAD_CATEGORIES_SUCCESS = '[Categories] Load Categories setup Success';

export const UPDATE_CATEGORY_ACTIVE = '[Category] Update Category to active';
export const UPDATE_CATEGORY_UNACTIVE = '[Category] Update Category to un-active';
export const UPDATE_CATEGORY_FAIL = '[Category] Update Category Fail';

export class LoadCategories implements Action {
  readonly type = LOAD_CATEGORIES;
  constructor(public payload: string) {
    // console.log(payload);
  }
}

export class LoadCategoriesFail implements Action {
  readonly type = LOAD_CATEGORIES_FAIL;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class LoadCategoriesSuccess implements Action {
  readonly type = LOAD_CATEGORIES_SUCCESS;
  constructor(public payload: Categories[]) {
    // console.log(payload);
  }
}

// create items
// update items
// delete items

// action types
export type CategoriesAction = LoadCategories
| LoadCategoriesFail
| LoadCategoriesSuccess;
