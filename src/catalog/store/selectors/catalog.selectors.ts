import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromCatalog from '../reducers/catalog.reducer';

import { Catalog } from '../../models/catalog.model';

export const getCatalogState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.catalog
);

export const getCatalogEntities = createSelector(
  getCatalogState,
  fromCatalog.getCatalogEntities
);

export const getSelectedCategory = createSelector(
  getCatalogEntities,
  fromRoot.getRouterState,
  (entities, router): Catalog => {
    const Id = router.state.params.Cat;
    return router.state && entities[Id];
  }
);

export const getCatalogBase = createSelector(
  getCatalogEntities,
  fromRoot.getUserRoles,
  (entities, roles) => {
    let list = Object.keys(entities).map(id => entities[id]);
    list = roles.dealer ? list.filter(li => li['active']) : list;
    return list;
  }
);

export const getCatalogLoaded = createSelector(
  getCatalogState,
  fromCatalog.getCatalogLoaded
);
export const getCatalogLoading = createSelector(
  getCatalogState,
  fromCatalog.getCatalogLoading
);
