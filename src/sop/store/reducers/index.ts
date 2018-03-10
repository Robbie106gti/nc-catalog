import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromSearch from './search.reducer';
import * as fromUpload from './upload.reducer';

export interface SopsState {
    search: fromSearch.SearchState;
    upload: fromUpload.UploadState;
}

export const reducers: ActionReducerMap<SopsState> = {
    search: fromSearch.reducer,
    upload: fromUpload.reducer
};

export const getSopsState = createFeatureSelector<SopsState>('sops');
