import * as fromCategories from '../actions/categories.action';
import { Categories } from '../../models/categories.model';
import * as common from '../../utils/common';

export interface CategoriesState {
  accessories: CategoriesLine;
  counters: CategoriesLine;
  columns: CategoriesLine;
  'customization-charges': CategoriesLine;
  doors: CategoriesLine;
  'finished-sides': CategoriesLine;
  'general-information': CategoriesLine;
  'materials-and-finishes': CategoriesLine;
  'trims-and-moldings': CategoriesLine;
  load?: string;
  lastload?: string;
}

export interface CategoriesLine {
  entities: { [id: string]: Categories };
  loaded: boolean;
  loading: boolean;
}

export const initialState: CategoriesState = {
  accessories: { entities: {}, loaded: false, loading: false },
  columns: { entities: {}, loaded: false, loading: false },
  counters: { entities: {}, loaded: false, loading: false },
  'customization-charges': { entities: {}, loaded: false, loading: false },
  doors: { entities: {}, loaded: false, loading: false },
  'finished-sides': { entities: {}, loaded: false, loading: false },
  'general-information': { entities: {}, loaded: false, loading: false },
  'materials-and-finishes': { entities: {}, loaded: false, loading: false },
  'trims-and-moldings': { entities: {}, loaded: false, loading: false }
};

export function reducer(state = initialState, action: fromCategories.CategoriesAction): CategoriesState {
  switch (action.type) {
    case fromCategories.LOAD_CATEGORIES: {
      const category = action.payload;
      return {
        ...state,
        load: category,
        [category]: { ...state[category], loading: true }
      };
    }

    case fromCategories.LOAD_CATEGORIES_SUCCESS: {
      const category = action.payload;
      const cat = category.length > 0 ? category[0].sub : state.load;
      const entities = category.reduce(
        // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: string]: Categories }, cat: Categories) => {
          return { ...entities, [common.makelink(cat.title)]: { ...cat, link: common.makelink(cat.title) } };
        },
        { ...state[cat].entities }
      );

      return {
        ...state,
        load: '',
        lastload: cat,
        [cat]: { entities, loaded: true, loading: false }
      };
    }

    case fromCategories.LOAD_CATEGORIES_FAIL: {
      return {
        ...state,
        load: '',
        lastload: state.load,
        [state.load]: { loaded: false, loading: false }
      };
    }
  }

  return state;
}

export const getCategoriesEntities = (state: CategoriesLine) => {
  // console.log(state);
  return state.entities;
};
export const getCategoriesLoading = (state: CategoriesLine) => state.loading;
export const getCategoriesLoaded = (state: CategoriesLine) => state.loaded;
export const getCategories = (state: CategoriesState) => state;
