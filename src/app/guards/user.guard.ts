import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable ,  of } from 'rxjs';
import { catchError, map, skipWhile } from 'rxjs/operators';

import * as fromStore from '../store';
@Injectable()
export class UserGuard implements CanActivate {
  constructor(private router: Router, private store: Store<fromStore.State>) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkStore().pipe(
      map(c => {
        if (c === true) {
          // this.router.navigate(['profile']);
          console.log('go to profile');
          return true;
        }
        return true;
      }),
      catchError(() => of(true))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getUserLoaded);
  }
}
