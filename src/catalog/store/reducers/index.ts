import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCatalog from './catalog.reduce';

export interface CatalogState {
    catalog: fromCatalog.CatalogState;
}

export const reducers: ActionReducerMap<CatalogState> = {
    catalog: fromCatalog.reducer
};

export const getCatalogState = createFeatureSelector<CatalogState>('catalog');
