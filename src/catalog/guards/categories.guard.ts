import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable ,  of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromRoot from '../../app/store';


@Injectable()
export class CategoriesGuard implements CanActivate {
  loaded: Observable<boolean>;
  id$: Observable<string>;
  constructor(private store: Store<fromStore.ProductsState>) {
      this.store.select(fromRoot.getRouterState).pipe(
          tap(router => this.id$ = router.state.params.Cat),
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
    // this.store.dispatch(new fromStore.LoadCategories('Base Categories'));
    return this.store.select(fromRoot.getRouterState).pipe(
        tap(router => router),
        switchMap(router => {
            // console.log(router);
            return this.store.select(fromStore.getCategoriesLoaded).pipe(
                tap(loaded => {
                  if (!loaded) {
                    this.store.dispatch(new fromStore.LoadCategories(router.state.params.Cat));
                  }
                }),
                filter(loaded => loaded),
                take(1)
            );
        })
    );
    }
}
