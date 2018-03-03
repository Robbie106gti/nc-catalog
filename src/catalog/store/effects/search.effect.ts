import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, filter, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromRoot from '../../../app/store';
import * as searchActions from '../actions';

@Injectable()
export class SearchEffects {
  constructor(
    private store: Store<fromStore.ProductsState>,
    private actions$: Actions
  ) {}

  @Effect()
  search$ = this.actions$.ofType(searchActions.SEARCH).pipe(
    switchMap(action => {
        let helper;
        switch (action['payload'].category) {
            case 'iwhd': {
                helper = 'getHelperIWHDs';
                break;
            }
            case 'specifications': {
                helper = 'getHelperSpecs';
                break;
            }
            case 'notes': {
                helper = 'getHelperNotes';
                break;
            }
            case 'addons': {
                helper = 'getHelperAddons';
                break;
            }
        }

      return  this.store.select(fromStore[helper])
        .pipe(
          map(search => new searchActions.SearchSuccess(search)),
          catchError(error => of(new searchActions.SearchFail(error)))
        );
    })
  );
}
