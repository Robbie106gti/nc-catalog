import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromCabinets from '../reducers/cabinets.reducer';

import { Cabinets } from '../../models/cabinets.model';

export const getCabinetsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.cabinets
);

export const getCabinetsLineState = createSelector(
    getCabinetsState,
    fromRoot.getRouterState,
    (cabinets, router) => {
        // console.log(cabinets, router);
        return cabinets[router.state.params.Id];
    }
);

export const getBCabinetsState = createSelector(
  fromFeature.getProductsState,
  fromRoot.getRouterState,
  (state: fromFeature.ProductsState, router) => state.cabinets['Base Cabinets']
);

export const getCabinetsEntities = createSelector(
    getCabinetsLineState,
    fromCabinets.getCabinetsEntities,
);

export const getSelectedCabinetLine = createSelector(
  getCabinetsEntities,
  fromRoot.getRouterState,
  (entities, router): Cabinets => {
    const Id = router.state.params.Id ? router.state.params.Id : router.state.url.split('/').pop().replace('%20', ' ');
    return router.state && entities[Id];
  }
);

export const getCabinets = createSelector(
  getCabinetsEntities,
  (entities): Cabinets[] => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getCabinetsLoaded = createSelector(
    getCabinetsLineState,
    fromCabinets.getCabinetsLoaded,
);

export const getCabinetsLoading = createSelector(
    getCabinetsLineState,
    fromCabinets.getCabinetsLoading,
);
