import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as helpersActions from '../actions/helpers.action';
import * as fromServices from '../../services';

interface Ap {
    type: string;
    payload: any;
  }

@Injectable()
export class HelpersEffects {
  constructor(
    private actions$: Actions,
    private firestoreService: fromServices.FirestoreService
  ) {}

  @Effect()
  loadHelper$ = this.actions$.ofType(
      helpersActions.LOAD_HELPERS,
    ).pipe(
    switchMap(helper => {
      return this.firestoreService
        .colWithIds$(`structure/helpers/${helper['payload']}`)
        .pipe(
          map(items => {
            const item = items.map(b => {
              return {...b, 'sub': helper['payload']};
            });
            return new helpersActions.LoadHelpersSuccess(item);
          }),
          catchError(error => of(new helpersActions.LoadHelpersFail(error)))
        );
    })
  );

  @Effect()
  loadHelperNote$ = this.actions$.ofType(
      helpersActions.LOAD_HELPERS_NOTES,
    ).pipe(
    switchMap(() => {
      return this.firestoreService
        .colWithIds$(`structure/helpers/notes`)
        .pipe(
          map(items => {
            const item = items.map(b => {
              return {...b, 'sub': 'notes'};
            });
            return new helpersActions.LoadHelpersSuccessNotes(item);
          }),
          catchError(error => of(new helpersActions.LoadHelpersFailNotes(error)))
        );
    })
  );

  @Effect()
  loadHelperIWHD$ = this.actions$.ofType(
      helpersActions.LOAD_HELPERS_IWHD,
    ).pipe(
    switchMap(() => {
      return this.firestoreService
        .colWithIds$(`structure/helpers/iwhd`)
        .pipe(
          map(items => {
            const item = items.map(b => {
              return {...b, 'sub': 'iwhd'};
            });
            return new helpersActions.LoadHelpersSuccessIWHD(item);
          }),
          catchError(error => of(new helpersActions.LoadHelpersFailIWHD(error)))
        );
    })
  );

  @Effect()
  loadHelperAddons$ = this.actions$.ofType(
      helpersActions.LOAD_HELPERS_ADDONS,
    ).pipe(
    switchMap(() => {
      return this.firestoreService
        .colWithIds$(`structure/helpers/addons`)
        .pipe(
          map(items => {
            const item = items.map(b => {
              return { ...b, 'sub': 'addons'};
            });
            return new helpersActions.LoadHelpersSuccessAddons(item);
          }),
          catchError(error => of(new helpersActions.LoadHelpersFailAddons(error)))
        );
    })
  );

  @Effect()
  loadHelperSpec$ = this.actions$.ofType(
      helpersActions.LOAD_HELPERS_SPEC,
    ).pipe(
    switchMap(() => {
      return this.firestoreService
        .colWithIds$(`structure/helpers/specifications`)
        .pipe(
          map(items => {
            const item = items.map(b => {
              return {...b, 'sub': 'specifications'};
            });
            return new helpersActions.LoadHelpersSuccessSpec(item);
          }),
          catchError(error => of(new helpersActions.LoadHelpersFailSpec(error)))
        );
    })
  );

}
