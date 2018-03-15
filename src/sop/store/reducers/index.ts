import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromSearch from './search.reducer';
import * as fromUpload from './upload.reducer';
import * as fromCat from './cat.reducer';
import * as fromSop from './sop.reducer';

export interface SopsState {
    search: fromSearch.SearchState;
    upload: fromUpload.UploadState;
    categories: fromCat.CatState;
    sop: fromSop.SopState;
}

export const reducers: ActionReducerMap<SopsState> = {
    search: fromSearch.reducer,
    upload: fromUpload.reducer,
    categories: fromCat.reducer,
    sop: fromSop.reducer
};

export const getSopsState = createFeatureSelector<SopsState>('sops');
export const getUserState = createFeatureSelector<any>('user');
