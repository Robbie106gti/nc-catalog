import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

export const getUserData = createSelector(fromFeature.getUserState, (state: any) => state.data);

export const getUserName = createSelector(getUserData, (data: any) => (data.fullName ? data.fullName : 'Guest'));

export const getUserRoles = createSelector(
  getUserData,
  (data: any) =>
    data.roles
      ? data.roles
      : { sop: false, editor: false, catEditor: false, admin: false, dealer: true, nickels: false, reader: true }
);
