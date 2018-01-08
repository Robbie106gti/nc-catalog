import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCatalog from './catalog.reducer';

export interface ProductsState {
    catalog: fromCatalog.CatalogState;
}

export const reducers: ActionReducerMap<ProductsState> = {
    catalog: fromCatalog.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');
