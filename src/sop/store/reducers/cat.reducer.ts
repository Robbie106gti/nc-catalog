import * as fromCat from '../actions/cat.action';

export interface CatState {
  entities: {};
  loaded: boolean;
  loading: boolean;
}

export const initialState: CatState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromCat.CatAction
): CatState {
  switch (action.type) {

    case fromCat.LOAD_CAT: {
      return {
        ...state,
        loading: true
      };
    }

    case fromCat.LOAD_CAT_FAIL: {
      return {
        ...state,
        loading: false
      };
    }

    case fromCat.LOAD_CAT_SUCCESS: {
      const catagories = action.payload;
      // console.log(catagories);
      catagories.sort((a, b) => a.sort - b.sort);
      const entities = catagories.reduce(
        // tslint:disable-next-line:no-shadowed-variable
      (entities: { [id: string]: any }, cat: any) => {
        return { ...entities, [cat.title]: { ...cat} };
      },
      { ...state.entities, });

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }

    case fromCat.ADD_CAT_SUCCESS: {
      return {
        ...state,
      };
    }
  }

  return state;
}

export const getCatEntities = (state: CatState) => state.entities;
export const getCatLoaded = (state: CatState) => state.loaded;
export const getCatLoading = (state: CatState) => state.loading;
