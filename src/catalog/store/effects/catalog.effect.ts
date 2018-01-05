import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as catalogActions from '../actions/catalog.action';
import * as fromServices from '../../services';

@Injectable()
export class CatalogEffects {
  constructor(
    private actions$: Actions,
    private catalogService: fromServices.CatalogService
  ) {}

  @Effect()
  loadBase$ = this.actions$.ofType(catalogActions.LOAD_BASE).pipe(
    switchMap(() => {
      return this.catalogService
        .getBase()
        .pipe(
          map(base => new catalogActions.LoadBaseSuccess(base)),
          catchError(error => of(new catalogActions.LoadBaseFail(error)))
        );
    })
  );

}
