import * as fromCatalog from '../actions/catalog.action';
import { Catalog } from '../../models/catalog.model';
import * as common from '../../utils/common';

export interface CatalogState {
  entities: { [id: string]: Catalog };
  loaded: boolean;
  loading: boolean;
}

export const initialState: CatalogState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: fromCatalog.CatalogAction): CatalogState {
  switch (action.type) {
    case fromCatalog.LOAD_CATALOG: {
      return {
        ...state,
        loading: true
      };
    }

    case fromCatalog.LOAD_CATALOG_SUCCESS: {
      const catagories = action.payload;
      // console.log(catagories);
      catagories.sort((a, b) => a.sort - b.sort);
      const entities = catagories.reduce(
        // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: string]: Catalog }, cat: Catalog) => {
          return { ...entities, [common.makelink(cat.title)]: { ...cat, link: common.makelink(cat.title) } };
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

    case fromCatalog.LOAD_CATALOG_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getCatalogEntities = (state: CatalogState) => state.entities;
export const getCatalogLoading = (state: CatalogState) => state.loading;
export const getCatalogLoaded = (state: CatalogState) => state.loaded;
