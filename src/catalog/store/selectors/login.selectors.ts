import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromLogin from '../reducers/login.reducer';

import { User } from '../../models/user.model';

export const getUserState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.user
);

export const getUserData = createSelector(
  getUserState,
  fromLogin.getUserData
);

export const getUserLoaded = createSelector(
  getUserState,
  fromLogin.getUserLoaded
);

export const getUserLoading = createSelector(
  getUserState,
  fromLogin.getUserLoading
);

export const getUserFavs = createSelector(
  getUserState,
  fromLogin.getUserFav
);

export const getUserNotes = createSelector(
  getUserState,
  fromLogin.getUserNotes
);

export const getUserFails = createSelector(
  getUserState,
  user => user.fails
);

export const getUserStatus = createSelector(
  getUserState,
  user => user.status
);
