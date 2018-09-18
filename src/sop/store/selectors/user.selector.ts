import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

export const getUserData = createSelector(fromFeature.getUserState, (state: any) => state.data);

export const getUserName = createSelector(getUserData, (data: any) => data.fullName);

export const getUserRoles = createSelector(getUserData, (data: any) => data.roles);
