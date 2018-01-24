import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCatalog from './catalog.reducer';
import * as fromCabinets from './cabinets.reducer';

export interface ProductsState {
    catalog: fromCatalog.CatalogState;
    cabinets: fromCabinets.CabinetsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
    catalog: fromCatalog.reducer,
    cabinets: fromCabinets.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');
