import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap, filter, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as searchActions from '../actions';
import { Payload } from '../../models/payload.model';

interface Ap {
  type: string;
  payload: any;
}

@Injectable()
export class SearchEffects {
  constructor(private store: Store<fromStore.SopsState>, private actions$: Actions) {}

  @Effect()
  search$ = this.actions$.ofType(searchActions.SEARCH_SOP).pipe(
    switchMap((action: Ap) => {
      return this.store.select(fromStore.getCats).pipe(
        map(search => new searchActions.SearchSuccess(search)),
        catchError(error => of(new searchActions.SearchFail(error)))
      );
    })
  );
}
