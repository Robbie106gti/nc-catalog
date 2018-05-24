import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as common from '../../utils/common';

import * as fromRoot from '../../../app/store';
import * as categoriesActions from '../actions/categories.action';
import * as fromServices from '../../services';
import { tap } from 'rxjs/operators/tap';

export interface Ac {
  type: string;
  payload: any;
}

@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions, private firestoreService: fromServices.FirestoreService) {}

  @Effect()
  loadCategories$ = this.actions$.ofType(categoriesActions.LOAD_CATEGORIES).pipe(
    switchMap((categories: Ac) => {
      return this.firestoreService.colWithIds$(`structure/category/${categories.payload.split('-').join(' ')}`).pipe(
        map(bases => {
          const base = bases.map(b => {
            return { ...b, sub: categories['payload'] };
          });
          return new categoriesActions.LoadCategoriesSuccess(base);
        }),
        catchError(error => of(new categoriesActions.LoadCategoriesFail(error)))
      );
    })
  );
}
