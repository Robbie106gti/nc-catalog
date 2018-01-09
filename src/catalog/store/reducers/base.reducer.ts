import * as fromBaseCab from '../actions/base.action';
import { Category } from '../../models/category.model';

export interface BaseCabState {
  entities: { [id: string]: Category };
  loaded: boolean;
  loading: boolean;
}

export const initialState: BaseCabState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromBaseCab.LoadCabinetsBase
): BaseCabState {
  switch (action.type) {

    case fromBaseCab.LOAD_BASE_CABINETS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromBaseCab.LOAD_BASE_CABINETS_SUCCESS: {
      const category = action.payload;

      const entities = category.reduce(
        // tslint:disable-next-line:no-shadowed-variable
      (entities: { [id: string]: Category }, cat: Category) => {
        return { ...entities, [cat.id]: { ...cat} };
      },
      { ...state.entities, });

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }

    case fromBaseCab.LOAD_BASE_CABINETS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }

  return state;
}

export const getBaseCabinetsEntities = (state: BaseCabState) => state.entities;
export const getBaseCabinetsLoading = (state: BaseCabState) => state.loading;
export const getBaseCabinetsLoaded = (state: BaseCabState) => state.loaded;
