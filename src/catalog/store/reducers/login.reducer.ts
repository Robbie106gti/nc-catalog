import * as fromLogin from '../actions/login.action';
import { Login } from '../../models/login.model';
import { User, WQUser } from '../../models/user.model';

export interface UserState {
  data: User;
  loaded: boolean;
  loading: boolean;
}

export const initialState: UserState = {
  data: null,
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
      const data: User = {
        wqData: wqUser,
        email: wqUser.valid.Email
      };

      return {
        ...state,
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

    case fromLogin.LOAD_LOGIN_FB: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromLogin.LOAD_LOGIN_FB_CK: {
      return {
        ...state,
      };
    }

    case fromLogin.LOAD_LOGIN_FB_SUCCESS: {
      const user = action.payload;

      return {
        ...state,
        loading: false,
        loaded: true,
        data: user,
      };
    }

    case fromLogin.LOAD_LOGIN_FB_FAIL: {
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
export const getUserLoading = (state: UserState) => state.loading;
export const getUserLoaded = (state: UserState) => state.loaded;
