import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError, map } from 'rxjs/operators';
import { base64Decode } from '@firebase/util';

import * as fromStore from '../store';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private store: Store<fromStore.State>, private http: HttpClient) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      map(c => console.log(c)),
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    const cook = this.parseCookie();
    // console.log(cook);
    if (cook !== null) {
      this.store.dispatch(new fromStore.LoadLoginHeader());
    } else {
      this.router.navigate(['login']);
    }
    return this.store.select(fromStore.getUserLoaded);
  }

  // https://netbasal.com/implementing-auth-guard-with-componentless-route-in-angular-b50a21f3bd77
  // CanActivateChild - this is how it should be

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
  }

  parseCookie() {
    const ck = this.getCookie('nc-catalog');
    let cookie: any;
    if (ck === '' || ck === 'Thu, 01 Jan 1970 01: 00: 08 UTC') {
      return (cookie = null);
    } else {
      cookie = JSON.parse(base64Decode(ck));
      return cookie;
    }
  }
}
