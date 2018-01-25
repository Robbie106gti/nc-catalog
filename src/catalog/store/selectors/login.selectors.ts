import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromLogin from '../reducers/login.reducer';

import { User } from '../../models/user.model';

export const getUserState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.user
);

export const getCatalogEntities = createSelector(
    getUserState,
  fromLogin.getUserData
);

export const getSelectedCategory = createSelector(
  getCatalogEntities,
  fromRoot.getRouterState,
  (entities, router): User => {
    const Id = router.state.params.Id ? router.state.params.Id : router.state.url.split('/').pop().replace('%20', ' ');
    return router.state && entities[Id];
  }
);

export const getCatalogBase = createSelector(getCatalogEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getCatalogLoaded = createSelector(
  getUserState,
  fromLogin.getCatalogLoaded
);
export const getCatalogLoading = createSelector(
  getUserState,
  fromLogin.getCatalogLoading
);
