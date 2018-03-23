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

// load favorites
export const LOAD_FAVORITES = '[User] Get Favorites';
export const LOAD_FAVORITES_FAIL = '[User] Get Favorites Fail';
export const LOAD_FAVORITES_SUCCESS = '[User] Get Favorites Success';

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
// delete items

// action types
export type LoginAction = LoadLogin
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
| CreateFBLoginSuccess;
