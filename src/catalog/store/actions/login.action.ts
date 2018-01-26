import { Action } from '@ngrx/store';
import { Login } from '../../models/login.model';
import { User, WQUser } from '../../models/user.model';

// load catalog
export const LOAD_LOGIN = '[Login] Login Webquoin setup';
export const LOAD_LOGIN_FAIL = '[Login] Login Webquoin setup Fail';
export const LOAD_LOGIN_SUCCESS = '[Login] Login Webquoin setup Success';

export const LOAD_LOGIN_FB = '[Login] Login Firebase setup';
export const LOAD_LOGIN_FB_FAIL = '[Login] Login Firebase setup Fail';
export const LOAD_LOGIN_FB_SUCCESS = '[Login] Login Firebase setup Success';

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

// create items
// update items
// delete items

// action types
export type LoginAction = LoadLogin | LoadLoginFail | LoadLoginSuccess | LoadLoginFb | LoadLoginFbFail | LoadLoginFbSuccess;
