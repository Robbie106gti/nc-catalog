import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError ,  tap } from 'rxjs/operators';
import * as common from '../../utils/common';

import * as fromRoot from '../../../app/store';
import * as categoriesActions from '../actions/categories.action';
import * as fromServices from '../../services';

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
