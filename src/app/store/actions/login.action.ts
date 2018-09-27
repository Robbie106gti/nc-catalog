import { Action } from '@ngrx/store';
import { Login } from '../../models/login.model';
import { User, WQUser, Favorites } from '../../models/user.model';

// load login
export const LOAD_LOGIN = '[Login] Login Webquoin setup';
export const LOAD_LOGIN_FAIL = '[Login] Login Webquoin setup Fail';
export const LOAD_LOGIN_SUCCESS = '[Login] Login Webquoin setup Success';

export const LOAD_LOGIN_FB = '[Login] Login Firebase setup';
export const LOAD_LOGIN_FB_CK = '[Login] CK Login Firebase setup';
export const LOAD_LOGIN_FB_FAIL = '[Login] Login Firebase setup Fail';
export const LOAD_LOGIN_FB_SUCCESS = '[Login] Login Firebase setup Success';

export const LOAD_LOGIN_HB = '[Login] HB Login Header Bearer setup';
export const LOAD_LOGIN_HB_SUCCESS = '[Login] HB Login Header Bearer setup Success';

// load favorites
export const LOAD_FAVORITES = '[User] Get Favorites';
export const LOAD_FAVORITES_FAIL = '[User] Get Favorites Fail';
export const LOAD_FAVORITES_SUCCESS = '[User] Get Favorites Success';

export const LOGOUT = '[User] Logged out user';
export const ENTERY_POINT = '[User] Entery point';

export const USERS = '[Users] Retrieving users';
export const USERS_LOADED = '[Users] Loaded users';
export const USERS_FAIL = '[Users] Retrieving users';

export class LoadLogin implements Action {
  readonly type = LOAD_LOGIN;
  constructor(public payload: Login) {
    // console.log(payload);
  }
}

export class LoadLoginFail implements Action {
  readonly type = LOAD_LOGIN_FAIL;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class LoadLoginSuccess implements Action {
  readonly type = LOAD_LOGIN_SUCCESS;
  constructor(public payload: WQUser) {
    // console.log(payload);
  }
}

export class LoadLoginFb implements Action {
  readonly type = LOAD_LOGIN_FB;
  constructor(public payload: WQUser) {
    // console.log(payload);
  }
}

export class LoadLoginFbCk implements Action {
  readonly type = LOAD_LOGIN_FB_CK;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class LoadLoginFbFail implements Action {
  readonly type = LOAD_LOGIN_FB_FAIL;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class LoadLoginFbSuccess implements Action {
  readonly type = LOAD_LOGIN_FB_SUCCESS;
  constructor(public payload: User) {
    // console.log(payload);
  }
}

export class LoadLoginHeader implements Action {
  readonly type = LOAD_LOGIN_HB;
}

export class LoadLoginHeaderSuccess implements Action {
  readonly type = LOAD_LOGIN_HB_SUCCESS;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class UserFavorites implements Action {
  readonly type = LOAD_FAVORITES;
}

export class UserFavoritesFail implements Action {
  readonly type = LOAD_FAVORITES_FAIL;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class UserFavoritesSuccess implements Action {
  readonly type = LOAD_FAVORITES_SUCCESS;
  constructor(public payload: Favorites[]) {
    // console.log(payload);
  }
}

// create user
export const CREATE_FB_LOGIN = '[Firebase] Create Login setup';
export const CREATE_FB_LOGIN_FAIL = '[Firebase] Create Login setup Fail';
export const CREATE_FB_LOGIN_SUCCESS = '[Firebase] Create Login setup Success';

export class CreateFBLogin implements Action {
  readonly type = CREATE_FB_LOGIN;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class CreateFBLoginFail implements Action {
  readonly type = CREATE_FB_LOGIN_FAIL;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class CreateFBLoginSuccess implements Action {
  readonly type = CREATE_FB_LOGIN_SUCCESS;
  constructor(public payload: Favorites[]) {
    // console.log(payload);
  }
}
// update items
export class EnteryPoint implements Action {
  readonly type = ENTERY_POINT;
  constructor(public payload: string) {
    // console.log(payload);
  }
}

// delete items
export class Logout implements Action {
  readonly type = LOGOUT;
}

// users items
export class GetUsers implements Action {
  readonly type = USERS;
  constructor(public payload: any) {
    // console.log(payload);
  }
}
export class GetUsersSuccess implements Action {
  readonly type = USERS_LOADED;
  constructor(public payload: any) {
    // console.log(payload);
  }
}
export class GetUsersFail implements Action {
  readonly type = USERS_FAIL;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

// action types
export type LoginAction =
  | LoadLogin
  | LoadLoginFail
  | LoadLoginSuccess
  | LoadLoginFb
  | LoadLoginFbCk
  | LoadLoginFbFail
  | LoadLoginFbSuccess
  | UserFavorites
  | UserFavoritesFail
  | UserFavoritesSuccess
  | CreateFBLogin
  | CreateFBLoginFail
  | CreateFBLoginSuccess
  | LoadLoginHeader
  | LoadLoginHeaderSuccess
  | Logout
  | EnteryPoint
  | GetUsers
  | GetUsersSuccess
  | GetUsersFail;
