import { createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromLogin from '../reducers/login.reducer';
import * as peopleArray from '../../shared/user/images';

export const getUserState = createSelector(fromRoot.getUser, (user: fromLogin.UserState) => user);

export const getUserData = createSelector(getUserState, fromLogin.getUserData);

export const getUserLoaded = createSelector(getUserState, fromLogin.getUserLoaded);

export const getUserFirestore = createSelector(getUserState, fromLogin.getUserStore);

export const getUserLoading = createSelector(getUserState, fromLogin.getUserLoading);

export const getUserFavs = createSelector(getUserState, fromLogin.getUserFav);

export const getUserNotes = createSelector(getUserState, fromLogin.getUserNotes);

export const getUserFails = createSelector(getUserState, user => user.fails);

export const getUserStatus = createSelector(getUserState, user => user.status);

export const getUserRoles = createSelector(getUserData, user => user.roles);

export const allowUserSop = createSelector(getUserRoles, roles => roles.sop);

export const allowUserCat = createSelector(getUserRoles, roles => roles.reader);

export const allowUserMds = createSelector(getUserRoles, roles => roles.nickels);

export const getEntrypoint = createSelector(getUserState, fromLogin.getEntry);

export const getUsers = createSelector(getUserState, user => {
  const images = peopleArray.peopleArray;
  const users = user.users;
  if (users === undefined) return users;
  const users2 = new Array();
  // tslint:disable-next-line:no-shadowed-variable
  users.map((user: any) => {
    let userUpdated = user;
    images.forEach(image => {
      if (image.email !== user.email) return;
      userUpdated = { ...user, image: image.image, ext: image.phone, position: image.position };
    });
    users2.push(userUpdated);
  });
  return users2;
});
