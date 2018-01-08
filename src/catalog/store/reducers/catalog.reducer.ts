import * as fromCatalog from '../actions/catalog.action';
import { Catalog } from '../../models/catalog.model';

export interface CatalogState {
  entities: { [id: number]: Catalog };
  loaded: boolean;
  loading: boolean;
}

export const initialState: CatalogState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromCatalog.CatalogAction
): CatalogState {
  switch (action.type) {
    case fromCatalog.LOAD_CATALOG: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromCatalog.LOAD_CATALOG_SUCCESS: {
      const base = action.payload;

      const entities = base.reduce(
        (entities1: { [id: number]: Catalog }, base1: Catalog) => {
          return {
            ...entities,
            [base1.id]: base,
          };
        },
        {
          ...state.entities,
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }

    case fromCatalog.LOAD_CATALOG_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }

  return state;
}

export const getCatalogEntities = (state: CatalogState) => state.entities;
export const getCatalogLoading = (state: CatalogState) => state.loading;
export const getCatalogLoaded = (state: CatalogState) => state.loaded;
