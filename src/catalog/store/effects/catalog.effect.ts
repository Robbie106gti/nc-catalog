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
    private firestoreService: fromServices.FirestoreService
  ) {}

  @Effect()
  loadCatalog$ = this.actions$.ofType(catalogActions.LOAD_CATALOG).pipe(
    switchMap(() => {
      return this.firestoreService
        .colWithIds$('categories')
        .pipe(
          map(catalog => new catalogActions.LoadCatalogSuccess(catalog)),
          catchError(error => of(new catalogActions.LoadCatalogFail(error)))
        );
    })
  );

}
