import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCatalog from './catalog.reducer';
import * as fromCabinets from './cabinets.reducer';
import * as fromCategories from './categories.reducer';
import * as fromHelpers from './helpers.reducer';
import * as fromSearch from './search.reducer';
import * as fromEdit from './edit.reducer';

export interface ProductsState {
  catalog: fromCatalog.CatalogState;
  cabinets: fromCabinets.CabinetsState;
  categories: fromCategories.CategoriesState;
  helpers: fromHelpers.HelperState;
  search: fromSearch.SearchState;
  edit: fromEdit.EditState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  catalog: fromCatalog.reducer,
  cabinets: fromCabinets.reducer,
  categories: fromCategories.reducer,
  helpers: fromHelpers.reducer,
  search: fromSearch.reducer,
  edit: fromEdit.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');
