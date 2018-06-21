import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromEdit from '../reducers/edit.reducer';

export const getEditState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.edit
);

export const getEditItem = createSelector(getEditState, fromEdit.getEditItem);

export const getEditLoaded = createSelector(getEditState, fromEdit.getEditLoaded);
