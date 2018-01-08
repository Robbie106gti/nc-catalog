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

export const getSelectedCatalog = createSelector(
  getCatalogEntities,
  fromRoot.getRouterState,
  (entities, router): Catalog => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const getAllPizzas = createSelector(getCatalogEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getCatalogLoaded = createSelector(
  getCatalogState,
  fromCatalog.getCatalogLoaded
);
export const getCatalogLoading = createSelector(
  getCatalogState,
  fromCatalog.getCatalogLoading
);
