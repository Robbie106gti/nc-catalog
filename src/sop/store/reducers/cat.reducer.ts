import * as fromCat from '../actions/cat.action';

export interface CatState {
  entities: { [id: string]: any };
  loaded: boolean;
  loading: boolean;
}

export const initialState: CatState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: fromCat.CatAction): CatState {
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
      // catagories.sort((a, b) => a.title - b.title);
      catagories.sort(function(a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
      const entities = catagories.reduce(
        // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: string]: any }, cat: any) => {
          return { ...entities, [cat.title]: { ...cat } };
        },
        { ...state.entities }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case fromCat.ADD_CAT_SUCCESS: {
      return {
        ...state
      };
    }

    case fromCat.UPDATE_CAT_LOADED: {
      const item = action.payload;
      state.entities[item.title].loading = false;
      state.entities[item.title].loaded = true;
      return {
        ...state
      };
    }

    case fromCat.UPDATE_CAT_LOADING: {
      const item = action.payload;
      state.entities[item.title].loading = true;
      return {
        ...state
      };
    }

    case fromCat.UPDATE_CAT_TI: {
      return {
        ...state
      };
    }

    case fromCat.UPDATE_CAT_TI_FAIL: {
      return {
        ...state
      };
    }

    case fromCat.UPDATE_CAT_TI_SUCCESS: {
      const item = action.payload;
      const newItem = action.payload.edit;
      newItem.title = item.title;
      newItem.image = item.image;
      newItem.updatedBy = item.updatedBy;
      delete state.entities[item.edit.titleOld];
      delete newItem.titleOld;
      state.entities = { ...state.entities, [newItem.title]: newItem };
      return {
        ...state
      };
    }
  }

  return state;
}

export const getCatEntities = (state: CatState) => state.entities;
export const getCatLoaded = (state: CatState) => state.loaded;
export const getCatLoading = (state: CatState) => state.loading;
