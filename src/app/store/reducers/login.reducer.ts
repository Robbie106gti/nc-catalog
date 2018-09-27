import * as fromLogin from '../actions/login.action';
import { User, Favorites, Notes } from '../../models/user.model';
import * as usersExtras from '../../shared/user/images';

export interface UserState {
  data: User;
  loaded: boolean;
  loading: boolean;
  enterypoint: string;
  firestore: boolean;
  favorites: Favorites[];
  notes: Notes[];
  fails: number;
  status?: string;
  users?: any;
}

export const initialState: UserState = {
  data: null,
  loaded: false,
  enterypoint: '',
  firestore: false,
  loading: false,
  favorites: new Array(),
  notes: new Array(),
  fails: -1
};

export function reducer(state = initialState, action: fromLogin.LoginAction): UserState {
  switch (action.type) {
    case fromLogin.LOAD_LOGIN: {
      return { ...state, loading: true };
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
        editor: false,
        catEditor: false
      };
      data['roles'] = roles;

      return { ...state, loading: true, loaded: true, data };
    }

    case fromLogin.LOAD_LOGIN_FAIL: {
      return { ...state, loading: false, loaded: false, status: action.payload, fails: state.fails + 1 };
    }

    case fromLogin.LOAD_LOGIN_FB: {
      return { ...state, loading: true };
    }

    case fromLogin.LOAD_LOGIN_FB_CK: {
      return { ...state };
    }

    case fromLogin.LOAD_LOGIN_HB: {
      return { ...state };
    }

    case fromLogin.LOAD_LOGIN_FB_SUCCESS: {
      let user = action.payload;
      if (user.fullName && usersExtras) {
        const image = usersExtras.peopleArray.filter(u => {
          const fullname = `${u.fname} ${u.lname}`;
          const img = fullname === user.fullName ? u : null;
          return img;
        });
        if (image.length >= 1) {
          user = { ...user, image: image[0].image, ext: image[0].phone, position: image[0].position };
        }
      }

      return { ...state, loading: false, loaded: true, firestore: true, data: user };
    }

    case fromLogin.LOAD_LOGIN_FB_FAIL: {
      return { ...state, loading: false, loaded: false };
    }

    case fromLogin.LOAD_FAVORITES_SUCCESS: {
      const favorites = action.payload;
      state = { ...state, favorites };

      return state;
    }

    case fromLogin.LOAD_FAVORITES_FAIL: {
      return { ...state };
    }

    case fromLogin.USERS_LOADED: {
      const users = action.payload;
      return { ...state, users };
    }

    case fromLogin.USERS_FAIL: {
      const users = action.payload;
      return { ...state, users };
    }

    case fromLogin.ENTERY_POINT: {
      const entry = action.payload;
      return { ...state, ...state.users, enterypoint: entry };
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
export const getUsers = (state: UserState) => state.users;
export const getEntry = (state: UserState) => state.enterypoint;
