import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as loginActions from '../actions/login.action';
import * as fromServices from '../../services';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private firestoreService: fromServices.FirestoreService
  ) {}

  @Effect()
  loadLogin$ = this.actions$.ofType(loginActions.LOAD_LOGIN).pipe(
    switchMap(() => {
      return this.firestoreService
        .colWithIds$('categories')
        .pipe(
          map(catalog => new loginActions.LoadLoginSuccess(catalog)),
          catchError(error => of(new loginActions.LoadLoginFail(error)))
        );
    })
  );

}
