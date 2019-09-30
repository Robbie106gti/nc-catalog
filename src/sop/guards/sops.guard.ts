import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable ,  of } from 'rxjs';
import { tap, filter, switchMap, catchError, skipWhile } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromRoot from '../../app/store';


@Injectable()
export class SopsGuard implements CanActivate {
  constructor(private store: Store<fromStore.SopsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getSelectedCat).pipe(
      skipWhile(sop => !sop),
      tap(sop => {
        // console.log(sop);
        if (!sop.loaded) {
          this.store.dispatch({ type: fromStore.LOAD_SOPS, payload: sop });
        }
      }),
      filter(sop => sop)
    );
  }
}
