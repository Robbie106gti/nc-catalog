import * as fromCategories from '../actions/categories.action';
import { Categories } from '../../models/categories.model';

export interface CategoriesState {
    'General Information': CategoriesLine;
    'Accessories': CategoriesLine;
    'Customization Charges': CategoriesLine;
    'Doors': CategoriesLine;
    'Materials and Finishes': CategoriesLine;
    'Counters': CategoriesLine;
    'Trims and Moldings': CategoriesLine;
    load?: string;
    lastload?: string;
  }

  export interface CategoriesLine {
    entities: { [id: string]: Categories };
    loaded: boolean;
    loading: boolean;
  }

export const initialState: CategoriesState = {
    'General Information': {
        entities: {},
        loaded: false,
        loading: false
    },
    'Accessories': {
        entities: {},
        loaded: false,
        loading: false
    },
    'Customization Charges': {
        entities: {},
        loaded: false,
        loading: false
    },
    'Doors': {
        entities: {},
        loaded: false,
        loading: false
    },
    'Materials and Finishes': {
        entities: {},
        loaded: false,
        loading: false
    },
    'Counters': {
        entities: {},
        loaded: false,
        loading: false
    },
    'Trims and Moldings': {
        entities: {},
        loaded: false,
        loading: false
    }
};

export function reducer(
  state = initialState,
  action: fromCategories.CategoriesAction
): CategoriesState {
  switch (action.type) {
    case fromCategories.LOAD_CATEGORIES: {
        const category = action.payload;
      return {
        ...state,
        load: category,
        [category]: { ...state[category], loading: true },
      };
    }

    case fromCategories.LOAD_CATEGORIES_SUCCESS: {
      const category = action.payload;
      const entities = category.reduce(
        // tslint:disable-next-line:no-shadowed-variable
      (entities: { [id: string]: Categories }, cat: Categories) => {
        return { ...entities, [cat.title]: {...cat}};
      },
      { ...state[state.load].entities, });

      return {
        ...state,
        load: '',
        lastload: state.load,
        [state.load]: { entities, loaded: true, loading: false },
      };
    }

    case fromCategories.LOAD_CATEGORIES_FAIL: {
      return {
        ...state,
        load: '',
        lastload: state.load,
        [state.load]: { loaded: false, loading: false },
      };
    }
  }

  return state;
}

export const getCategoriesEntities = (state: CategoriesLine) => state.entities;
export const getCategoriesLoading = (state: CategoriesLine) => state.loading;
export const getCategoriesLoaded = (state: CategoriesLine) => state.loaded;
