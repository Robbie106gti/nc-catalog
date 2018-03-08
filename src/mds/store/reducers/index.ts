import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromSearch from './search.reducer';

export interface MdsState {
    search: fromSearch.SearchState;
}

export const reducers: ActionReducerMap<MdsState> = {
    search: fromSearch.reducer
};

export const getMdsState = createFeatureSelector<MdsState>('mds');
