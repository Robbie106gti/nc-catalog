import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as bccabinetsActions from '../actions/bccabinets.action';
import * as fromServices from '../../services';

@Injectable()
export class BCCabinetsEffects {
  constructor(
    private actions$: Actions,
    private firestoreService: fromServices.FirestoreService
  ) {}

  @Effect()
  loadBCCabinets$ = this.actions$.ofType(bccabinetsActions.LOAD_BC_CABINETS).pipe(
    switchMap(() => {
      return this.firestoreService
        .colWithIds$('structure/cabinets/base channel cabinets')
        .pipe(
          map(base => new bccabinetsActions.LoadBCCabinetsSuccess(base)),
          catchError(error => of(new bccabinetsActions.LoadBCCabinetsFail(error)))
        );
    })
  );

}
