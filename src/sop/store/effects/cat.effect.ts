import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, filter, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromServices from '../../services';
import * as catActions from '../actions';

@Injectable()
export class CatEffects {
  constructor(
    private store: Store<fromStore.SopsState>,
    private actions$: Actions,
    private firestore: fromServices.FirestoreService
  ) {}

  @Effect()
  load_cat$ = this.actions$.ofType(catActions.LOAD_CAT).pipe(
    switchMap(action => {
      return this.firestore.colWithIds$('sops')
      .pipe(
        map(entities => {
          const item = entities.map(b => {
            return {...b, 'sub': 'main'};
          });
          return new catActions.LoadCatSuccess(item);
        }),
        catchError(error => of(new catActions.LoadCatFail(error)))
      );
    })
  );

  @Effect()
  add_cat$ = this.actions$.ofType(catActions.ADD_CAT_SUCCESS).pipe(
    switchMap(action => {
      console.log(action['payload']);
      // return this.firestore.add('sops', action['payload']);
      return of(null);
    })
  );
}
