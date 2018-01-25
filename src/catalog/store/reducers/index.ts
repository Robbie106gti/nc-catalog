import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCatalog from './catalog.reducer';
import * as fromCabinets from './cabinets.reducer';
import * as fromLogin from './login.reducer';

export interface ProductsState {
    catalog: fromCatalog.CatalogState;
    cabinets: fromCabinets.CabinetsState;
    user: fromLogin.UserState;
}

export const reducers: ActionReducerMap<ProductsState> = {
    catalog: fromCatalog.reducer,
    cabinets: fromCabinets.reducer,
    user: fromLogin.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');
