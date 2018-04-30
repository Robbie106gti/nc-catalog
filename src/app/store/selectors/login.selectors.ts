import { createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromLogin from '../reducers/login.reducer';

export const getUserState = createSelector(
  fromRoot.getUser,
  (user: fromLogin.UserState) => user
);

export const getUserData = createSelector(getUserState, fromLogin.getUserData);

export const getUserLoaded = createSelector(
  getUserState,
  fromLogin.getUserLoaded
);

export const getUserFirestore = createSelector(
  getUserState,
  fromLogin.getUserStore
);

export const getUserLoading = createSelector(
  getUserState,
  fromLogin.getUserLoading
);

export const getUserFavs = createSelector(getUserState, fromLogin.getUserFav);

export const getUserNotes = createSelector(
  getUserState,
  fromLogin.getUserNotes
);

export const getUserFails = createSelector(getUserState, user => user.fails);

export const getUserStatus = createSelector(getUserState, user => user.status);

export const getUserRoles = createSelector(getUserData, user => user.roles);
