import * as fromLogin from '../actions/login.action';
import { Login } from '../../models/login.model';
import { User, WQUser, Favorites, Notes } from '../../models/user.model';

export interface UserState {
  data: User;
  loaded: boolean;
  loading: boolean;
  firestore: boolean;
  favorites: Favorites[];
  notes: Notes[];
  fails: number;
  status?: string;
}

export const initialState: UserState = {
  data: null,
  loaded: false,
  firestore: false,
  loading: true,
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
        loading: true
      };
    }

    case fromLogin.LOAD_LOGIN_SUCCESS: {
      // console.log(action.payload);
      const data = action.payload.user;
      const roles = {
        admin: false,
        reader: true,
        dealer: true,
        sop: false,
        nickels: false,
        editor: false
      };
      data['roles'] = roles;

      return {
        ...state,
        loading: true,
        loaded: true,
        data
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
        loading: true
      };
    }

    case fromLogin.LOAD_LOGIN_FB_CK: {
      return {
        ...state
      };
    }

    case fromLogin.LOAD_LOGIN_FB_SUCCESS: {
      const user = action.payload;

      return {
        ...state,
        loading: false,
        loaded: true,
        firestore: true,
        data: user
      };
    }

    case fromLogin.LOAD_LOGIN_FB_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
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
export const getUserStore = (state: UserState) => state.firestore;
export const getUserFav = (state: UserState) => state.favorites;
export const getUserNotes = (state: UserState) => state.notes;
