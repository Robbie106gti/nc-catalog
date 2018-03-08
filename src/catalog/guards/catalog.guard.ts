import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class CatalogGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getCatalogLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadCatalog());
          this.store.dispatch({type: fromStore.LOAD_HELPERS_ADDONS});
          this.store.dispatch({type: fromStore.LOAD_HELPERS_IWHD});
          this.store.dispatch({type: fromStore.LOAD_HELPERS_NOTES});
          this.store.dispatch({type: fromStore.LOAD_HELPERS_SPEC});
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
