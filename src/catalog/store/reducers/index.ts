import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCatalog from './catalog.reducer';
import * as fromBCabinets from './bcabinets.reducer';
import * as fromBCCabinets from './bccabinets.reducer';

export interface ProductsState {
    catalog: fromCatalog.CatalogState;
    bcabinets: fromBCabinets.BCabinetsState;
    bccabinets: fromBCCabinets.BCCabinetsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
    catalog: fromCatalog.reducer,
    bcabinets: fromBCabinets.reducer,
    bccabinets: fromBCabinets.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');
