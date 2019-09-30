import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as searchActions from '../actions';

interface Ap {
  type: string;
  payload: any;
}
@Injectable()
export class SearchEffects {
  constructor(private store: Store<fromStore.ProductsState>, private actions$: Actions) {}

  @Effect()
  search$ = this.actions$.ofType(searchActions.SEARCH).pipe(
    switchMap((action: Ap) => {
      // console.log(action);
      let helper;
      switch (action.payload.category) {
        case 'dimensions': {
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

      return this.store.select(fromStore[helper]).pipe(
        map(search => new searchActions.SearchSuccess(search)),
        catchError(error => of(new searchActions.SearchFail(error)))
      );
    })
  );
}
