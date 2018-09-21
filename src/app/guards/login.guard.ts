import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { base64Decode } from '@firebase/util';

import * as fromStore from '../store';

@Injectable()
export class LoginGuard implements CanActivate {
  endpoint = 'https://us-central1-nickels-catalog.cloudfunctions.net/auth-login';
  constructor(private router: Router, private store: Store<fromStore.State>, private http: HttpClient) {}

  canActivate(): Observable<boolean> {
    const cookie = this.parseCookie();
    cookie.pipe(
      switchMap(c => {
        if (c['value'] !== null) {
          const data = c['value'];
          return this.http.post(this.endpoint, { ...data, cookie: true }).pipe(
            map(success => {
              this.store.dispatch({
                type: fromStore.LOAD_LOGIN_HB_SUCCESS,
                payload: success
              });
              this.firestoreService.refreshCustomClaims(success);
              return new loginActions.LoadLoginFbCk(data);
            }),
            catchError(err => of(console.log(`Header error ${err}`, err)))
          );
        } else {
          return this.router.navigate(['/login']);
        }
      })
    );
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getUserLoaded);
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
    let cookie: Observable<any>;
    if (ck === '') {
      return of((cookie = null));
    } else {
      cookie = JSON.parse(base64Decode(ck));
      // console.log(cookie);
      return of(cookie);
    }
  }
}
