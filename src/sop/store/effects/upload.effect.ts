import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, filter, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as uploadActions from '../actions';
import * as fromServices from '../../services';

@Injectable()
export class UploadEffects {
  constructor(
    private store: Store<fromStore.SopsState>,
    private actions$: Actions,
    private storage: fromServices.StorageService
  ) {}

  @Effect()
  upload$ = this.actions$.ofType(uploadActions.UPLOAD).pipe(
    switchMap(action => {
      return this.storage.upload(action['payload'])
      .pipe(
        map(snap => new fromStore.UploadSuccess(snap)),
        catchError(error => of(new fromStore.UploadFail(error)))
      );
    })
  );
}
