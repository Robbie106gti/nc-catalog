import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';

import { User } from '../../models/user.model';

export const getUserState = createSelector(fromRoot.getUser, user => user);

export const getUserData = createSelector(getUserState, user => user.data);

export const getUserLoaded = createSelector(getUserState, user => user.loaded);

export const getUserFirestore = createSelector(
  getUserState,
  user => user.firestore
);

export const getUserLoading = createSelector(
  getUserState,
  user => user.loading
);

export const getUserFavs = createSelector(getUserState, user => user.favorites);

export const getUserNotes = createSelector(getUserState, user => user.notes);

export const getUserFails = createSelector(getUserState, user => user.fails);

export const getUserStatus = createSelector(getUserState, user => user.status);
