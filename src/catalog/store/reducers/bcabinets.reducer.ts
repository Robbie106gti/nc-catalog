import * as fromBCabinets from '../actions/bcabinets.action';
import { Cabinets } from '../../models/cabinets.model';

export interface BCabinetsState {
  entities: { [id: string]: Cabinets };
  loaded: boolean;
  loading: boolean;
}

export const initialState: BCabinetsState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromBCabinets.BCabinetsAction
): BCabinetsState {
  switch (action.type) {

    case fromBCabinets.LOAD_B_CABINETS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromBCabinets.LOAD_B_CABINETS_SUCCESS: {
      const category = action.payload;
      const entities = category.reduce(
        // tslint:disable-next-line:no-shadowed-variable
      (entities: { [id: string]: Cabinets }, cat: Cabinets) => {
        return { ...entities, [cat.title]: {...cat}};
      },
      { ...state.entities, });

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }

    case fromBCabinets.LOAD_B_CABINETS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }

  return state;
}

export const getBCabinetsEntities = (state: BCabinetsState) => state.entities;
export const getBCabinetsLoading = (state: BCabinetsState) => state.loading;
export const getBCabinetsLoaded = (state: BCabinetsState) => state.loaded;
