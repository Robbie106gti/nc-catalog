import * as fromBCCabinets from '../actions/bccabinets.action';
import { Cabinets } from '../../models/cabinets.model';

export interface BCCabinetsState {
  entities: { [id: string]: Cabinets };
  loaded: boolean;
  loading: boolean;
}

export const initialState: BCCabinetsState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromBCCabinets.BCCabinetsAction
): BCCabinetsState {
  switch (action.type) {

    case fromBCCabinets.LOAD_BC_CABINETS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromBCCabinets.LOAD_BC_CABINETS_SUCCESS: {
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

    case fromBCCabinets.LOAD_BC_CABINETS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }

  return state;
}

export const getBCCabinetsEntities = (state: BCCabinetsState) => state.entities;
export const getBCCabinetsLoading = (state: BCCabinetsState) => state.loading;
export const getBCCabinetsLoaded = (state: BCCabinetsState) => state.loaded;
