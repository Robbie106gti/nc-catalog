import * as fromLogin from '../actions/login.action';
import { Login } from '../../models/login.model';
import { User, WQUser } from '../../models/user.model';

export interface UserState {
  data: User;
  loaded: boolean;
  loading: boolean;
}

export const initialState: UserState = {
  data: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromLogin.LoginAction
): UserState {
  switch (action.type) {

    case fromLogin.LOAD_LOGIN: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromLogin.LOAD_LOGIN_SUCCESS: {
      const wqUser = action.payload;

      const data = wqUser.reduce(
        // tslint:disable-next-line:no-shadowed-variable
      (data: User, cat: WQUser) => {
        return { ...data, [cat.title]: { ...cat} };
      },
      { ...state.data, });

      return {
        ...state,
        loading: false,
        loaded: true,
        data,
      };
    }

    case fromLogin.LOAD_LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }

  return state;
}

export const getUserData = (state: UserState) => state.data;
export const getCatalogLoading = (state: UserState) => state.loading;
export const getCatalogLoaded = (state: UserState) => state.loaded;
