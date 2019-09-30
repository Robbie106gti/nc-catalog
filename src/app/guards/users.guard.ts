import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable ,  of } from 'rxjs';
import { catchError, map, skipWhile } from 'rxjs/operators';

import * as fromStore from '../store';
@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private router: Router, private store: Store<fromStore.State>) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkStore().pipe(
      map(c => {
        if (c === false) {
          this.router.navigate(['profile']);
        }
        return c;
      }),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.allowUserMds);
  }
}
