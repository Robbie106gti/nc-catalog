import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromSearch from '../reducers/search.reducer';

export const getSearchState = createSelector(
  fromFeature.getSopsState,
  (state: fromFeature.SopsState) => state.search
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

export const getIcons = createSelector(
  fromRoot.getIcons,
  icons => icons['icons']
);
