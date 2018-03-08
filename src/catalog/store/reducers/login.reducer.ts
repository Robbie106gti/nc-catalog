import * as fromLogin from '../actions/login.action';
import { Login } from '../../models/login.model';
import { User, WQUser, Favorites, Notes } from '../../models/user.model';

export interface UserState {
  data: User;
  loaded: boolean;
  loading: boolean;
  favorites: Favorites[];
  notes: Notes[];
  fails: number;
  status?: string;
}

export const initialState: UserState = {
  data: null,
  loaded: false,
  loading: false,
  favorites: new Array(),
  notes: new Array(),
  fails: -1
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
        status: action.payload,
        fails: state.fails + 1
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

    case fromLogin.LOAD_FAVORITES_SUCCESS: {
      const favorites = action.payload;
      state = {
        ...state,
        favorites
      };

      return state;
    }

    case fromLogin.LOAD_FAVORITES_FAIL: {
      return {
        ...state
      };
    }
  }

  return state;
}

export const getUserData = (state: UserState) => state.data;
export const getUserLoading = (state: UserState) => state.loading;
export const getUserLoaded = (state: UserState) => state.loaded;
export const getUserFav = (state: UserState) => state.favorites;
export const getUserNotes = (state: UserState) => state.notes;
