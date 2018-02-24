import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCatalog from './catalog.reducer';
import * as fromCabinets from './cabinets.reducer';
import * as fromCategories from './categories.reducer';
import * as fromLogin from './login.reducer';
import * as fromHelpers from './helpers.reducer';
import * as fromSearch from './search.reducer';

export interface ProductsState {
    catalog: fromCatalog.CatalogState;
    cabinets: fromCabinets.CabinetsState;
    categories: fromCategories.CategoriesState;
    user: fromLogin.UserState;
    helpers: fromHelpers.HelperState;
    search: fromSearch.SearchState;
}

export const reducers: ActionReducerMap<ProductsState> = {
    catalog: fromCatalog.reducer,
    cabinets: fromCabinets.reducer,
    categories: fromCategories.reducer,
    user: fromLogin.reducer,
    helpers: fromHelpers.reducer,
    search: fromSearch.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');
