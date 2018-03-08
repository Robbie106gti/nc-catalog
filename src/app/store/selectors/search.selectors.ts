import { createSelector } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as fromSearch from '../reducers/search.reducer';

export const getSearchState = createSelector(
  fromRoot.getSearch,
  (state: fromSearch.SearchState) => state
);

export const getSearchResults = createSelector(
  getSearchState,
  fromSearch.getSearchResults
);

export const getSearchLoaded = createSelector(
    getSearchState,
    fromSearch.getSearchLoaded
);

export const getSearchLoading = createSelector(
    getSearchState,
  fromSearch.getSearchLoading
);
