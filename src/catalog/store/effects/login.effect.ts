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
    email: string;
    class: string;
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
            this.setCookie({ email: user.valid.Email, class: user.valid.DealerID }, 30);
            return new loginActions.LoadLoginFb(user);
        }),
        catchError(error => of(new loginActions.LoadLoginFail(error)))
        )
    ));

    @Effect()
    loadLoginFb$ = this.actions$.ofType(loginActions.LOAD_LOGIN_FB).pipe(
      switchMap((action: Ap) => {
        return this.firestoreService
          .docWithRefs$(`users/${action.payload.valid.Email}`)
          .pipe(
            map((userfb: User) => new loginActions.LoadLoginFbSuccess({...userfb, wqData: action.payload })),
            catchError(error => of(new loginActions.LoadLoginFbFail({ ...error, wqData: action.payload })))
          );
      })
    );

    @Effect()
    loadLoginFbCookie$ = this.actions$.ofType(loginActions.LOAD_LOGIN_FB_CK).pipe(
      map(() => this.parseCookie()),
      switchMap(res => this.firestoreService
                        .docWithRefs$(`users/${res.email}`)
                        .pipe(
                            map((userfb: User) => new loginActions.LoadLoginFbSuccess({ ...userfb })),
                            catchError(error => of(new loginActions.LoadLoginFbFail({ ...error, wqData: res })))
                        ))
    );

  @Effect()
  createLoginFb$ = this.actions$.ofType(loginActions.LOAD_LOGIN_FB_FAIL).pipe(
      switchMap((action: Ap2) => {
          const data: User = {
            class: action.payload.wqData.valid.DealerID.trim(),
            dealerName: action.payload.wqData.valid.DealerName.trim(),
            displayName: action.payload.wqData.valid.DisplayName.trim(),
            email: action.payload.wqData.valid.Email.trim(),
            firstName: action.payload.wqData.valid.FirstName.trim(),
            lastName: action.payload.wqData.valid.LastName.trim(),
            fullName: action.payload.wqData.valid.FirstName.trim() + ' ' + action.payload.wqData.valid.LastName.trim(),
            username: action.payload.wqData.valid.UserName.trim()
          };
        return this.firestoreService.set(`users/${action.payload.wqData.valid.Email}`, data);

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
   str = str.trim();
   return str;
 }

 setCookie(data, exdays) {
   const d = new Date();
   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
   const expires = 'expires=' + d.toUTCString();
   const cookie = JSON.stringify({
     class: data.class,
     email: data.email
   });
   document.cookie = 'username=' + cookie + ';' + expires + ';path=/';
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
    const ck = this.getCookie('username');
    if (ck !== '') {
        /// User logged in
        const cookie: Res = JSON.parse(ck);
        return cookie;
    } else {
        /// User not logged in
        return null;
    }
 }

  compare(user, wq) {
    wq.valid.DisplayName = wq.valid.DisplayName.trim();
    wq.valid.FirstName = wq.valid.FirstName.trim();
    wq.valid.LastName = wq.valid.LastName.trim();
    wq.valid.UserName = wq.valid.UserName.trim();
    let firstName;
    let lastName;
    let fullName;
    let displayName;
    let dealerID;
    let dealerName;
    let email;
    let street;
    let city;
    let state;
    let postcode;
    if (user.firstName === wq.valid.FirstName) {
      console.log(user.firstName, wq.valid.FirstName);
      firstName = wq.valid.FirstName;
      fullName = wq.valid.FirstName + ' ' + wq.valid.LastName;
    }
    if (user.lastName === wq.valid.LastName) {
      console.log(user.lastName, wq.valid.LastName);
      lastName = wq.valid.LastName;
      fullName = wq.valid.FirstName + ' ' + wq.valid.LastName;
    }
    if (user.displayName === wq.valid.DisplayName) {
      console.log(user.displayName, wq.valid.DisplayName);
      displayName = wq.valid.DisplayName;
    }
    if (user.dealerID === wq.valid.DealerID) {
      console.log(user.dealerID, wq.valid.DealerID);
      dealerID = wq.valid.DealerID;
    }
    if (user.dealerName === wq.valid.DealerName) {
      console.log(user.dealerName, wq.valid.DealerName);
      dealerName = wq.valid.DealerName;
    }
    if (user.dealerName === wq.valid.DealerName) {
      console.log(user.dealerName, wq.valid.DealerName);
      dealerName = wq.valid.DealerName;
    }
    if (user.email === wq.valid.Email) {
      console.log(user.dealerName, wq.valid.Email);
      email = wq.valid.Email;
    }
    if (user.address.street === wq.valid.DealerAddress1) {
      console.log(wq.valid.DealerAddress1);
      street = wq.valid.DealerAddress1;
    }
    if (user.address.city === wq.valid.DealerAddress2) {
      console.log(wq.valid.DealerAddress2);
      city = wq.valid.DealerAddress2;
    }
    if (user.address.state === wq.valid.DealerAddress3) {
      console.log(wq.valid.DealerAddress3);
      state = wq.valid.DealerAddress3;
    }
    if (user.address.postcode === wq.valid.DealerPostalCode) {
      console.log(wq.valid.DealerPostalCode);
      postcode = wq.valid.DealerPostalCode;
    }
  }

}
