import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromRoot from '../../app/store';
import { map } from 'rxjs/operator/map';

@Injectable()
export class CabinetsGuard implements CanActivate {
  loaded: Observable<boolean>;
  id$: Observable<string>;
  constructor(private store: Store<fromStore.ProductsState>) {
      this.store.select(fromRoot.getRouterState).pipe(
          tap(router => this.id$ = router.state.params.Id),
          take(1)
      );
  }

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    // this.store.dispatch(new fromStore.LoadCabinets('Base Cabinets'));
    return this.store.select(fromRoot.getRouterState).pipe(
        tap(router => router),
        switchMap(router => {
            // console.log(router);
            return this.store.select(fromStore.getCabinetsLoaded).pipe(
                tap(loaded => {
                  if (!loaded) {
                    this.store.dispatch(new fromStore.LoadCabinets(router.state.params.Id));
                  }
                }),
                filter(loaded => loaded),
                take(1)
            );
        })
    );
    }
}
