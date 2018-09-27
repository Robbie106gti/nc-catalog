import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, skipWhile } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class LoginGuard implements CanActivate {
  route: Observable<any>;
  constructor(private router: Router, private store: Store<fromStore.State>) {
    this.route = this.store.select(fromStore.getRouterState);
  }

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      map(c => {
        if (c === false) {
          this.router.navigate(['login']);
        }
        return c;
      }),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    this.route.subscribe(r => {
      if (r.navigationId === 1) {
        this.store.dispatch({ type: fromStore.ENTERY_POINT, payload: r.state.url });
      }
    });
    // this.store.dispatch({ type: fromStore.ENTERY_POINT, payload: this.route.url });
    return this.store.select(fromStore.getUserLoaded);
  }

  checkRouter(): Observable<any> {
    return this.store.select(fromStore.getUserLoaded);
  }

  // https://netbasal.com/implementing-auth-guard-with-componentless-route-in-angular-b50a21f3bd77
}
