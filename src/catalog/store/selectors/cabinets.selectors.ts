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
        return cabinets[router.state.params.Cat];
    }
);

export const getCabinetsEntities = createSelector(
    getCabinetsLineState,
    fromCabinets.getCabinetsEntities,
);

export const getSelectedCabinetLine = createSelector(
  getCabinetsEntities,
  fromRoot.getRouterState,
  (entities, router): Cabinets => {
    const Id = router.state.params.Cat;
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

export const getSelectedRouteCat = createSelector(
  fromRoot.getRouterState,
  (router) => {
    return router.state.params.Cat;
  }
);

export const getSelectedRouteItem = createSelector(
  fromRoot.getRouterState,
  (router) => {
    return router.state.params.Item;
  }
);

export const getSelectedCabinetItem = createSelector(
  getCabinets,
  fromRoot.getRouterState,
  (entities, router) => {
    let entity;
    entities.map(en => {
      if (en.title === router.state.params.Item) { return entity = en; }
    });
    return entity;
  }
);

export const getToEditCabinet = createSelector(
  getCabinetsState,
  (cabinets) => {
    return cabinets['To Edit'];
  }
);

export const getUpload = createSelector(
  getCabinetsState,
  (cabinets) => {
    return cabinets['Upload'];
  }
);

export const getUploadStatus = createSelector(
  getUpload,
  (upload) => {
    return upload.status;
  }
);

export const getUploadPct = createSelector(
  getUpload,
  (upload) => {
    const pct = (upload.status.bytesTransferred / (upload.status.totalBytes / 100));
    // console.log(pct);
    return Number(pct);
  }
);

export const getUploadUrl = createSelector(
  getUpload,
  (upload) => {
    const url = upload.status.downloadURL;
    console.log(url);
    return url;
  }
);
