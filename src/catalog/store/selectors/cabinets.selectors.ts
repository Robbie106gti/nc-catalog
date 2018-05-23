import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromCabinets from '../reducers/cabinets.reducer';

import { Cabinets } from '../../models/cabinets.model';

export const getCabinetsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.cabinets
);

export const getSelectedRouteCat = createSelector(fromRoot.getRouterState, router => router.state.params.Cat);

export const getSelectedRouteItem = createSelector(fromRoot.getRouterState, router => router.state.params.Item);

export const getCabinetsLineState = createSelector(
  getCabinetsState,
  getSelectedRouteCat,
  (cabinets, cat) => cabinets[cat]
);

export const getCabinetsEntities = createSelector(getCabinetsLineState, fromCabinets.getCabinetsEntities);

export const getSelectedCabinetLine = createSelector(
  getCabinetsEntities,
  getSelectedRouteCat,
  (entities, cat): Cabinets => entities[cat]
);

export const getCabinets = createSelector(getCabinetsEntities, fromRoot.getUserRoles, (entities, roles): Cabinets[] => {
  let list = Object.keys(entities).map(id => entities[id]);
  list = roles.dealer ? list.filter(li => li.active) : list;
  return list;
});

export const getCabinetsLoaded = createSelector(getCabinetsLineState, fromCabinets.getCabinetsLoaded);

export const getCabinetsLoading = createSelector(getCabinetsLineState, fromCabinets.getCabinetsLoading);

export const getSelectedCabinetItem = createSelector(
  getCabinetsEntities,
  getSelectedRouteItem,
  (entities, item) => entities[item]
);

export const getToEditCabinet = createSelector(getCabinetsState, cabinets => cabinets['To Edit']);

export const getUpload = createSelector(getCabinetsState, cabinets => cabinets['Upload']);

export const getUploadStatus = createSelector(getUpload, upload => upload.status);

export const getUploadPct = createSelector(getUpload, upload =>
  (upload.status.bytesTransferred / (upload.status.totalBytes / 100)).toFixed(0)
);

export const getUploadUrl = createSelector(getUpload, upload => upload.status.downloadURL);

export const getDownloadUrl = createSelector(getCabinetsState, cabinets => cabinets['Download']);
