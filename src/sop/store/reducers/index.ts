import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromSearch from './search.reducer';
import * as fromUpload from './upload.reducer';
import * as fromCat from './cat.reducer';

export interface SopsState {
    search: fromSearch.SearchState;
    upload: fromUpload.UploadState;
    categories: fromCat.CatState;
}

export const reducers: ActionReducerMap<SopsState> = {
    search: fromSearch.reducer,
    upload: fromUpload.reducer,
    categories: fromCat.reducer
};

export const getSopsState = createFeatureSelector<SopsState>('sops');
export const getUserState = createFeatureSelector<any>('user');
