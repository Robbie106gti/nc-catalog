import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, delay, retry, retryWhen, delayWhen, skipWhile } from 'rxjs/operators';

import * as loginActions from '../actions/login.action';
import * as fromServices from '../../services';
import { User, WQUser, Favorites } from '../../models/user.model';
import { Login } from '../../models/login.model';
import { Observable } from 'rxjs/Observable';
import { base64Encode, base64Decode } from '@firebase/util';

export interface Ap {
  type: string;
  payload: any;
}
export interface Ap2 {
  type: string;
  payload: Er;
}
export interface Er {
  code: string;
  name: string;
  wqData: WQUser;
}
export interface Lg {
  type: string;
  payload: Login;
}
export interface Res {
  value: {
    email: string;
    class: string;
  };
}

@Injectable()
export class LoginEffects {
  endpoint = 'https://us-central1-nickels-catalog.cloudfunctions.net/auth-login';
  // endpoint = 'http://localhost:5000/nickels-catalog/us-central1/auth-login';
  res = new Observable<Res>();

  constructor(
    private actions$: Actions,
    private firestoreService: fromServices.FirestoreService,
    private store: Store<fromStore.State>,
    private http: HttpClient
  ) {}

  @Effect()
  loadLogin$ = this.actions$.ofType(loginActions.LOAD_LOGIN).pipe(
    switchMap((login: Lg) =>
      this.http.post(this.endpoint, login.payload).pipe(
        map((user: WQUser) => {
          // console.log(user);
          if (user.valid.Error) {
            return new loginActions.LoadLoginFail(user.valid.Error);
          } else {
            this.setCookie(
              {
                email: user.valid.Email,
                class: user.valid.DealerID,
                username: user.valid.UserName
              },
              30
            );
            this.store.dispatch({
              type: fromStore.LOAD_LOGIN_SUCCESS,
              payload: user
            });
            return new loginActions.LoadLoginFb(user);
          }
        }),
        catchError(err => of(new loginActions.LoadLoginFail(err)))
      )
    )
  );

  @Effect()
  loadLoginFb$ = this.actions$.ofType(loginActions.LOAD_LOGIN_SUCCESS).pipe(
    switchMap((action: Ap) => {
      // console.log(action);
      return this.firestoreService.exists(`users/${action.payload.valid.Email}`).pipe(
        skipWhile(snap => !snap.payload.exists),
        switchMap(() => {
          // console.log('Hello');
          return this.firestoreService.docWithRefs$(`users/${action.payload.valid.Email}`).pipe(
            map((userfb: User) => {
              this.store.dispatch({ type: fromStore.BACK });
              return new loginActions.LoadLoginFbSuccess(userfb);
            })
          );
        })
      );
    })
  );

  @Effect()
  LoadLoginFbCk$ = this.actions$.ofType(loginActions.LOAD_LOGIN_FB_CK).pipe(
    switchMap((cookie: Ap) => {
      // console.log(cookie);
      if (cookie !== null) {
        // console.log(cookie.payload.email);
        return this.firestoreService.docWithRefs$(`users/${cookie.payload.email}`).pipe(
          map((userfb: User) => new loginActions.LoadLoginFbSuccess(userfb)),
          catchError(err =>
            of(
              new loginActions.LoadLoginFail({
                ...err,
                wqData: cookie.payload
              })
            )
          )
        );
      } else {
        console.log('I have gotten lost');
      }
    }),
    catchError(err => of(new loginActions.LoadLoginFail({ ...err, cookie: 'No Cookie' })))
  );

  @Effect()
  setHeaderBearer$ = this.actions$.ofType(loginActions.LOAD_LOGIN_HB).pipe(
    map(() => this.parseCookie()),
    switchMap(res => {
      // console.log(res);
      if (res['value'] !== null) {
        // console.log(action);
        const cookie = res['value'];
        return this.http.post(this.endpoint, { ...cookie, cookie: true }).pipe(
          map(success => {
            // console.log(`Set header: `, success);
            this.store.dispatch({
              type: fromStore.LOAD_LOGIN_HB_SUCCESS,
              payload: success
            });
            this.firestoreService.refreshCustomClaims(success);
            // this.firestoreService.checkCustomClaims();
            return new loginActions.LoadLoginFbCk(cookie);
          }),
          catchError(err => of(console.log(`Header error ${err}`, err)))
        );
      }
    }),
    catchError(err => of(new loginActions.LoadLoginFail({ ...err, cookie: 'No Cookie' })))
  );

  @Effect()
  UserFavorites$ = this.actions$.ofType(loginActions.LOAD_LOGIN_FB_SUCCESS).pipe(
    switchMap((action: Ap) => {
      // console.log(action);
      // this.firestoreService.checkCustomClaims();
      return this.firestoreService.col$(`users/${action.payload.email}/favorites`).pipe(
        map((fav: Favorites[]) => new loginActions.UserFavoritesSuccess(fav)),
        catchError(err => of(new loginActions.UserFavoritesFail(err)))
      );
    })
  );

  @Effect()
  Users$ = this.actions$.ofType(loginActions.USERS).pipe(
    switchMap(action => {
      return this.firestoreService.col$('/users').pipe(
        map(users => new loginActions.GetUsersSuccess(users)),
        catchError(err => of(new loginActions.GetUsersFail(err)))
      );
    })
  );

  trimit(str) {
    return str ? str.trim() : null;
  }

  setCookie(data, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    const cookie = JSON.stringify({
      class: data.class,
      email: data.email,
      username: data.username
    });
    document.cookie = 'nc-catalog=' + base64Encode(cookie) + ';' + expires + ';path=/';
  }

  getCookie(cname) {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  parseCookie() {
    const ck = this.getCookie('nc-catalog');
    let cookie: Observable<Res>;
    if (ck === '') {
      return of((cookie = null));
    } else {
      cookie = JSON.parse(base64Decode(ck));
      // console.log(cookie);
      return of(cookie);
    }
  }
}
