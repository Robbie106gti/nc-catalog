import * as fromCabinets from '../actions/cabinets.action';
import { Cabinets } from '../../models/cabinets.model';

export interface CabinetsState {
    'Base Cabinets': CabinetsLine;
    'Base Channel Cabinets': CabinetsLine;
    'Floating Vanity Cabinets': CabinetsLine;
    'Tall Cabinets': CabinetsLine;
    'Tall Channel Cabinets': CabinetsLine;
    'Vanity Cabinets': CabinetsLine;
    'Vanity Channel Cabinets': CabinetsLine;
    'Wall Cabinets': CabinetsLine;
    'Wall Channel Cabinets': CabinetsLine;
    'Wardrobe Cabinets': CabinetsLine;
    load?: string;
    lastload?: string;
  }

  export interface CabinetsLine {
    entities: { [id: string]: Cabinets };
    loaded: boolean;
    loading: boolean;
  }

export const initialState: CabinetsState = {
    'Base Cabinets': {
        entities: {},
        loaded: false,
        loading: false
    },
    'Base Channel Cabinets': {
        entities: {},
        loaded: false,
        loading: false
    },
    'Floating Vanity Cabinets': {
        entities: {},
        loaded: false,
        loading: false
    },
    'Tall Cabinets': {
        entities: {},
        loaded: false,
        loading: false
    },
    'Tall Channel Cabinets': {
        entities: {},
        loaded: false,
        loading: false
    },
    'Vanity Cabinets': {
        entities: {},
        loaded: false,
        loading: false
    },
    'Vanity Channel Cabinets': {
        entities: {},
        loaded: false,
        loading: false
    },
    'Wall Cabinets': {
        entities: {},
        loaded: false,
        loading: false
    },
    'Wall Channel Cabinets': {
        entities: {},
        loaded: false,
        loading: false
    },
    'Wardrobe Cabinets': {
        entities: {},
        loaded: false,
        loading: false
    }
};

export function reducer(
  state = initialState,
  action: fromCabinets.CabinetsAction
): CabinetsState {
  switch (action.type) {
    case fromCabinets.LOAD_CABINETS: {
        const category = action.payload;
      return {
        ...state,
        load: category,
        [category]: { ...state[category], loading: true },
      };
    }

    case fromCabinets.LOAD_CABINETS_SUCCESS: {
      const category = action.payload;
      const entities = category.reduce(
        // tslint:disable-next-line:no-shadowed-variable
      (entities: { [id: string]: Cabinets }, cat: Cabinets) => {
        return { ...entities, [cat.title]: {...cat }};
      },
      { ...state[category[0].sub].entities, });

      return {
        ...state,
        load: '',
        lastload: category[0].sub,
        [category[0].sub]: { entities, loaded: true, loading: false },
      };
    }

    case fromCabinets.LOAD_CABINETS_FAIL: {
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



export const getCabinetsBaseEntities = (state: CabinetsState) => state['Base Cabinets'].entities;
export const getCabinetsBaseLoading = (state: CabinetsState) => state['Base Cabinets'].loading;
export const getCabinetsBaseLoaded = (state: CabinetsState) => state['Base Cabinets'].loaded;

export const getCabinetsEntities = (state: CabinetsLine) => state.entities;
export const getCabinetsLoading = (state: CabinetsLine) => state.loading;
export const getCabinetsLoaded = (state: CabinetsLine) => state.loaded;
