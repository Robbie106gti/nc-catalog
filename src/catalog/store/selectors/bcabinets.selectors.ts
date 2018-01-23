import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromBCabinets from '../reducers/bcabinets.reducer';
import * as fromBCCabinets from '../reducers/bccabinets.reducer';

import { Cabinets } from '../../models/cabinets.model';

export const getBCabinetsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.bcabinets
);

export const getBCCabinetsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.bccabinets
);

export const getBCabinetsEntities = createSelector(
  getBCabinetsState,
  fromBCabinets.getBCabinetsEntities
);

export const getBCCabinetsEntities = createSelector(
  getBCCabinetsState,
  fromBCabinets.getBCabinetsEntities
);

export const getSelectedBCabinet = createSelector(
  getBCabinetsEntities,
  fromRoot.getRouterState,
  (entities, router): Cabinets => {
    const Id = router.state.params.Id ? router.state.params.Id : router.state.url.split('/').pop().replace('%20', ' ');
    return router.state && entities[Id];
  }
);

export const getSelectedBCCabinet = createSelector(
  getBCCabinetsEntities,
  fromRoot.getRouterState,
  (entities, router): Cabinets => {
    const Id = router.state.params.Id ? router.state.params.Id : router.state.url.split('/').pop().replace('%20', ' ');
    return router.state && entities[Id];
  }
);

export const getBCabinets = createSelector(
  getBCabinetsEntities,
  (entities): Cabinets[] => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getBCCabinets = createSelector(
  getBCCabinetsEntities,
  (entities): Cabinets[] => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getCabinetsSel = createSelector(
  fromRoot.getRouterState,
  router => {
    const Id = router.state.params.Id ? router.state.params.Id : router.state.url.split('/').pop().replace('%20', ' ');
    return switchCases(Id);
});

export const getBCabinetsLoaded = createSelector(
    getBCabinetsState,
    fromBCabinets.getBCabinetsLoaded
);

export const getBCCabinetsLoaded = createSelector(
    getBCCabinetsState,
    fromBCCabinets.getBCCabinetsLoaded
);

export const getBCabinetsLoading = createSelector(
    getBCabinetsState,
    fromBCabinets.getBCabinetsLoading
);

export const getBCCabinetsLoading = createSelector(
    getBCCabinetsState,
    fromBCCabinets.getBCCabinetsLoading
);


 function switchCases(id) {
   switch (id) {
     case 'Base Cabinets': return getBCabinets;
     case 'Base Channel Cabinets': return getBCCabinets;
   }
 }
