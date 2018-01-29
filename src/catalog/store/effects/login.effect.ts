import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as loginActions from '../actions/login.action';
import * as fromServices from '../../services';
import { User, WQUser } from '../../models/user.model';
import { Login } from '../../models/login.model';
import { Observable } from 'rxjs/Observable';
import { error } from 'selenium-webdriver';

export interface Ap {
    type: string;
    payload: WQUser;
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
    private store: Store<fromStore.ProductsState>,
    private http: HttpClient
  ) {}

  @Effect()
  loadLogin$ = this.actions$.ofType(loginActions.LOAD_LOGIN).pipe(
    switchMap((login: Lg) => this.http.post(this.endpoint, login.payload).pipe(
        map((user: WQUser) => {
            // console.log(user);
            this.setCookie({ email: user.valid.Email, class: user.valid.DealerID }, 30);
            return new loginActions.LoadLoginFb(user);
        }),
        catchError(err => of(new loginActions.LoadLoginFail(err)))
        )
    ));

    @Effect()
    loadLoginFb$ = this.actions$.ofType(loginActions.LOAD_LOGIN_FB).pipe(
      switchMap((action: Ap) => {
        return this.firestoreService
          .docWithRefs$(`users/${action.payload.valid.Email}`)
          .pipe(
            map((userfb: User) => new loginActions.LoadLoginFbSuccess({ ...userfb, wqData: action.payload })),
            catchError(err => of(new loginActions.LoadLoginFbFail({ ...err, wqData: action.payload })))
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
  createLoginFb$ = this.actions$.ofType(loginActions.LOAD_LOGIN_FB_FAIL).pipe(
      switchMap((action: Ap2) => {
        console.log(action.payload.wqData);
        const fname = this.trimit(action.payload.wqData.valid.FirstName);
        const lname = this.trimit(action.payload.wqData.valid.LastName);

          const data: User = {
            class: this.trimit(action.payload.wqData.valid.DealerID),
            dealerName: this.trimit(action.payload.wqData.valid.DealerName),
            displayName: this.trimit(action.payload.wqData.valid.DisplayName),
            email: this.trimit(action.payload.wqData.valid.Email),
            firstName: fname,
            lastName: lname,
            fullName: fname + ' ' + lname,
            username: this.trimit(action.payload.wqData.valid.UserName),
            roles: {
              reader: true
            },
            status: 'online',
            address: {
                street: this.trimit(action.payload.wqData.valid.DealerAddress1),
                city: this.trimit(action.payload.wqData.valid.DealerAddress2),
                state: this.trimit(action.payload.wqData.valid.DealerAddress3),
                postcode: this.trimit(action.payload.wqData.valid.DealerPostalCode)
            }
          };
        return this.firestoreService.upsertUser(`users/${action.payload.wqData.valid.Email}`, data);
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
