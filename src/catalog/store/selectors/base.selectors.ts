import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromBaseCab from '../reducers/base.reducer';

import { Category } from '../../models/category.model';

export const getBaseCabState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.baseCabinets
);

export const getBaseCabEntities = createSelector(
  getBaseCabState,
  fromBaseCab.getBaseCabinetsEntities
);

export const getSelectedBaseCab = createSelector(
    getBaseCabEntities,
  fromRoot.getRouterState,
  (entities, router): Category => {
    return router.state && entities[router.state.params.Id];
  }
);

export const getBaseCab = createSelector(getBaseCabEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getBaseCabLoaded = createSelector(
    getBaseCabState,
    fromBaseCab.getBaseCabinetsLoaded
);
export const getBaseCabLoading = createSelector(
    getBaseCabState,
    fromBaseCab.getBaseCabinetsLoading
);
