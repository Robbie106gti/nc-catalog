import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, delay, retry, retryWhen, skipWhile } from 'rxjs/operators';

import * as loginActions from '../actions/login.action';
import * as fromServices from '../../services';
import { User, WQUser, Favorites } from '../../models/user.model';
import { Login } from '../../models/login.model';
import { Observable } from 'rxjs/Observable';

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
    endpoint = 'https://us-central1-nickels-catalog.cloudfunctions.net/auth';
    wqUser: Observable<any>;

  constructor(
    private actions$: Actions,
    private firestoreService: fromServices.FirestoreService,
    private store: Store<fromStore.State>,
    private http: HttpClient
  ) {}

  @Effect()
  loadLogin$ = this.actions$.ofType(loginActions.LOAD_LOGIN).pipe(
    switchMap((login: Lg) => this.http.post(this.endpoint, login.payload).pipe(
        map((user: WQUser) => {
            // console.log(user);
            if (user.valid.Error) {
              return new loginActions.LoadLoginFail(user.valid.Error);
            } else {
              this.setCookie({ email: user.valid.Email, class: user.valid.DealerID }, 30);
              return new loginActions.LoadLoginFb(user);
            }
        }),
        catchError(err => of(new loginActions.LoadLoginFail(err)))
        )
    ));

/*     @Effect()
    loadLoginFb$ = this.actions$.ofType(loginActions.LOAD_LOGIN_FB).pipe(
      switchMap((action: Ap) => {
        return this.firestoreService.docWithRefs$(`users/${action.payload.valid.Email}`).pipe(
          map((userfb: User) => {
            return new loginActions.LoadLoginFbSuccess({ ...userfb, wqData: action.payload });
          }),
          catchError(err => of(new loginActions.CreateFBLogin(action.payload)))
        );
      })
    ); */

    @Effect()
    loadLoginFb$ = this.actions$.ofType(loginActions.LOAD_LOGIN_FB).pipe(
      switchMap((action: Ap) => {
        return this.firestoreService.exists(`users/${action.payload.Email}`).pipe(
          map(snap => {
            // console.log(snap);
            if (snap.payload.exists === true) {
              // this.firestoreService.update(`users/${action.payload.valid.Email}`, data);
              return this.firestoreService.docWithRefs$(`users/${action.payload.valid.Email}`).pipe(
                map((userfb: User) => {
                  return new loginActions.LoadLoginFbSuccess({ ...userfb, wqData: action.payload });
                }),
                catchError(err => of(new loginActions.LoadLoginFbFail({ error: err, wqData: action.payload})))
              );
            } else {
              return new loginActions.CreateFBLogin(action.payload);
            }
          }),
          catchError(err => of(console.log(err)))
        );
      })
    );

    @Effect()
    createLoginFb$ = this.actions$.ofType(loginActions.CREATE_FB_LOGIN).pipe(
      switchMap((action: Ap) => {
        const fname = this.trimit(action.payload.valid.FirstName);
        const lname = this.trimit(action.payload.valid.LastName);
        const email = this.trimit(action.payload.valid.Email);
        const user = {
          class: this.trimit(action.payload.valid.DealerID),
          dealerName: this.trimit(action.payload.valid.DealerName),
          displayName: this.trimit(action.payload.valid.DisplayName),
          email: this.trimit(action.payload.valid.Email),
          firstName: fname,
          lastName: lname,
          fullName: fname + ' ' + lname,
          username: this.trimit(action.payload.valid.UserName),
          roles: {
            reader: true
          },
          status: 'online',
          address: {
              street: this.trimit(action.payload.valid.DealerAddress1),
              city: this.trimit(action.payload.valid.DealerAddress2),
              state: this.trimit(action.payload.valid.DealerAddress3),
              postcode: this.trimit(action.payload.valid.DealerPostalCode)
          },
          wqData: action.payload
        };
        return this.firestoreService.set(`users/${action.payload.valid.Email}`, user).then(() => location.reload());
        /* return this.firestoreService.set(`users/${action.payload.valid.Email}`, user).then(
          () => new loginActions.CreateFBLoginSuccess(action.payload)
        ); */
      })
    );

    @Effect()
    createLoginFbSuccess$ = this.actions$.ofType(loginActions.CREATE_FB_LOGIN_SUCCESS).pipe(
      switchMap((action: Ap) => {
        console.log(action);
        return this.firestoreService.docWithRefs$(`users/${action.payload.Email}`).pipe(
          tap((userfb: User) =>  {
            if (userfb) {
              console.log(userfb);
              return new loginActions.LoadLoginFbSuccess({ ...userfb, wqData: action.payload });
            }
          })
        );
      })
    );

    @Effect()
    loadLoginFbCookie$ = this.actions$.ofType(loginActions.LOAD_LOGIN_FB_CK).pipe(
      map(() => this.parseCookie()),
      switchMap((res: Observable<Res>) => {
          // console.log(res);
          if (res['value'] !== null) {
            return this.firestoreService
            .docWithRefs$(`users/${res['value'].email}`)
            .pipe(
                map((userfb: User) => new loginActions.LoadLoginFbSuccess(userfb)),
                catchError(err => of(new loginActions.LoadLoginFail({ ...err, wqData: res })))
            );
        }
      }),
      catchError(err => of(new loginActions.LoadLoginFail({ ...err, cookie: 'No Cookie'})))
    );

    @Effect()
    UserFavorites$ = this.actions$.ofType(loginActions.LOAD_LOGIN_FB_SUCCESS).pipe(
      switchMap((action: Ap) => {
        // console.log(action);
        return this.firestoreService
          .col$(`users/${action.payload.email}/favorites`)
          .pipe(
            map((fav: Favorites[]) => new loginActions.UserFavoritesSuccess(fav)),
            catchError(err => of(new loginActions.UserFavoritesFail(err)))
          );
      })
    );

  webquoin(userlogin) {
    const webq = this.http.post(this.endpoint, userlogin)
    .subscribe(Response => {
        const fname = this.trimit(Response['valid'].FirstName);
        const lname = this.trimit(Response['valid'].LastName);
        const email = this.trimit(Response['valid'].Email);
        const obj = {
          id: email,
          status: 'online',
          class: this.trimit(Response['valid'].DealerID),
          dealerName: this.trimit(Response['valid'].DealerName),
          displayName: this.trimit(Response['valid'].DisplayName),
          firstName: fname,
          lastName: lname,
          email: email,
          fullName: fname + ' ' + lname,
          username: this.trimit(Response['valid'].UserName),
          roles: {
            reader: true
          }
        };
        this.setCookie(obj, 7);
        // this.userCheck(obj);
    });
 }

 trimit(str) {
   return str ? str.trim() : null;
 }

 setCookie(data, exdays) {
   const d = new Date();
   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
   const expires = 'expires=' + d.toUTCString();
   const cookie = JSON.stringify({
     class: data.class,
     email: data.email
   });
   document.cookie = 'nc-catalog=' + cookie + ';' + expires + ';path=/';
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
  // console.log(ck + 'just hanging out');
  if (ck === '') {
    /// User not logged in
    // console.log(ck + 'null');
    return of(cookie = null);
  } else {
    /// User logged in
    // console.log(ck + 'im a live');
    cookie = JSON.parse(ck);
    return of(cookie);
  }
 }
}
