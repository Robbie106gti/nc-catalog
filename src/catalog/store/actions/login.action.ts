import { Action } from '@ngrx/store';
import { Login } from '../../models/login.model';
import { User, WQUser } from '../../models/user.model';

// load catalog
export const LOAD_LOGIN = '[Login] Login Webquoin setup';
export const LOAD_LOGIN_FAIL = '[Login] Login Webquoin setup Fail';
export const LOAD_LOGIN_SUCCESS = '[Login] Login Webquoin setup Success';

export class LoadLogin implements Action {
  readonly type = LOAD_LOGIN;
  constructor(public payload: string) {
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

// create items
// update items
// delete items

// action types
export type LoginAction = LoadLogin | LoadLoginFail | LoadLoginSuccess;
