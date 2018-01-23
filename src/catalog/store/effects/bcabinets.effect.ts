import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as bcabinetsActions from '../actions/bcabinets.action';
import * as fromServices from '../../services';

@Injectable()
export class BCabinetsEffects {
  constructor(
    private actions$: Actions,
    private firestoreService: fromServices.FirestoreService
  ) {}

  @Effect()
  loadBCabinets$ = this.actions$.ofType(bcabinetsActions.LOAD_B_CABINETS).pipe(
    switchMap(() => {
      return this.firestoreService
        .colWithIds$('structure/cabinets/base cabinets')
        .pipe(
          map(base => new bcabinetsActions.LoadBCabinetsSuccess(base)),
          catchError(error => of(new bcabinetsActions.LoadBCabinetsFail(error)))
        );
    })
  );

}
