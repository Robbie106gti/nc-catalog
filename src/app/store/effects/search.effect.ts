import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, filter, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as searchActions from '../actions';

@Injectable()
export class SearchEffects {
  constructor(
    private store: Store<fromStore.State>,
    private actions$: Actions
  ) {}

  @Effect()
  search$ = this.actions$.ofType(searchActions.SEARCH).pipe(
    switchMap(action => {
      return of(null);
    })
  );
}
