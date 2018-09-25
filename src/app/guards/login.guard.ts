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
  constructor(private router: Router, private store: Store<fromStore.State>, private http: HttpClient) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getUserLoaded);
  }
}
