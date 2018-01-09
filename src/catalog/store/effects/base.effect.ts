import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as bCabinetsActions from '../actions/base.action';
import * as fromServices from '../../services';

@Injectable()
export class BaseCabEffects {
  constructor(
    private actions$: Actions,
    private firestoreService: fromServices.FirestoreService
  ) {}

  @Effect()
  loadBaseCabinets$ = this.actions$.ofType(bCabinetsActions.LOAD_BASE_CABINETS).pipe(
    switchMap(() => {
      return this.firestoreService
        .colWithIds$('structure/cabinets/base cabinets')
        .pipe(
          map(base => new bCabinetsActions.LoadCabinetsBaseSuccess(base)),
          catchError(error => of(new bCabinetsActions.LoadCabinetsBaseFail(error)))
        );
    })
  );

}
