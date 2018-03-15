import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromCat from '../reducers/cat.reducer';

export const getCatState = createSelector(
  fromFeature.getSopsState,
  (state: fromFeature.SopsState) => state.categories
);

export const getCatEntities = createSelector(
  getCatState,
  fromCat.getCatEntities
);

export const getCats = createSelector(
  getCatEntities,
  entities => Object.keys(entities).map(id => entities[id])
);

export const getCatLoaded = createSelector(
  getCatState,
  fromCat.getCatLoaded
);

export const getCatLoading = createSelector(
  getCatState,
  fromCat.getCatLoading
);

export const getSelectedCat = createSelector(
  getCatEntities,
  fromRoot.getRouterState,
  (entities, router) => {
    const Id = router.state.params.Sop;
    return entities[Id];
  }
);
