import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromSearch from './search.reducer';

export interface SopsState {
    search: fromSearch.SearchState;
}

export const reducers: ActionReducerMap<SopsState> = {
    search: fromSearch.reducer
};

export const getSopsState = createFeatureSelector<SopsState>('sops');
