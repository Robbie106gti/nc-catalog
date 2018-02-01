import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromCategories from '../reducers/categories.reducer';

import { Categories } from '../../models/categories.model';

export const getCategoriesState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.categories
);

export const getCategoriesLineState = createSelector(
    getCategoriesState,
    fromRoot.getRouterState,
    (categories, router) => {
        // console.log(categories, router);
        return categories[router.state.params.Id];
    }
);

export const getCategoriesEntities = createSelector(
    getCategoriesLineState,
    fromCategories.getCategoriesEntities,
);

export const getSelectedCategoryLine = createSelector(
  getCategoriesEntities,
  fromRoot.getRouterState,
  (entities, router): Categories => {
    const Id = router.state.params.Id ? router.state.params.Id : router.state.url.split('/').pop().replace('%20', ' ');
    return router.state && entities[Id];
  }
);

export const getCategories = createSelector(
  getCategoriesEntities,
  (entities): Categories[] => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getCategoriesLoaded = createSelector(
    getCategoriesLineState,
    fromCategories.getCategoriesLoaded,
);

export const getCategoriesLoading = createSelector(
    getCategoriesLineState,
    fromCategories.getCategoriesLoading,
);
