import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, switchMap, catchError, skipWhile } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromRoot from '../../app/store';
import { map } from 'rxjs/operator/map';

@Injectable()
export class SopsGuard implements CanActivate {
  constructor(private store: Store<fromStore.SopsState>) { }

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    let loaded;
    return this.store.select(fromStore.getSelectedCat).pipe(
      skipWhile(load => !load),
      tap(load => {
        if (!loaded) {
          this.store.dispatch({ type: fromStore.LOAD_SOPS, payload: load});
          loaded = true;
        }
      }),
      filter(load => load)
    );
  }
}
