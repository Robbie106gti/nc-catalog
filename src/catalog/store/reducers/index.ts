import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCatalog from './catalog.reducer';
import * as fromBaseCab from './base.reducer';

export interface ProductsState {
    catalog: fromCatalog.CatalogState;
    baseCabinets: fromBaseCab.BaseCabState;
}

export const reducers: ActionReducerMap<ProductsState> = {
    catalog: fromCatalog.reducer,
    baseCabinets: fromBaseCab.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');
