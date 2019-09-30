import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap, filter, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromServices from '../../services';
import * as catActions from '../actions';
import { Payload } from '../../models/payload.model';

@Injectable()
export class CatEffects {
  constructor(
    private store: Store<fromStore.SopsState>,
    private actions$: Actions,
    private firestore: fromServices.FirestoreService
  ) {}

  @Effect()
  load_cat$ = this.actions$.ofType(catActions.LOAD_CAT).pipe(
    switchMap((action: Payload) => {
      return this.firestore.colWithIds$('sops')
      .pipe(
        map(entities => {
          const item = entities.map(b => {
            return {...b, 'sub': 'main'};
          });
          return new catActions.LoadCatSuccess(item);
        }),
        catchError(error => of(new catActions.LoadCatFail(error)))
      );
    })
  );

  @Effect()
  add_cat$ = this.actions$.ofType(catActions.ADD_CAT_SUCCESS).pipe(
    switchMap((action: Payload) => {
      // console.log(action.payload);
      const cat = {
        title: action.payload.title,
        createdBy: action.payload.fullName,
        updatedBy: action.payload.fullName,
        image: action.payload.image,
        active: true,
        sort: 100
      };
      return this.firestore.add('sops', cat);
    })
  );

  @Effect()
  update_cat_ti$ = this.actions$.ofType(catActions.UPDATE_CAT_TI).pipe(
    switchMap((action: Payload) => {
      return this.store.select(fromStore.getUploadUrl).pipe(
        take(1),
        map(url => {
          // console.log(action.payload, url);
          let cat;
          if (action.payload.remove) {
            this.firestore.delete(`sops/${action.payload.edit.id}`);
            cat = 'removed';
          } else {
            cat = {
              title: action.payload.titleNew,
              updatedBy: action.payload.fullName,
              image: action.payload.imageNew
            };
            this.firestore.update(`sops/${action.payload.edit.id}`, cat);
          }
          return new fromStore.UpdateCatTIsuccess({...cat, edit: action.payload.edit });
        }),
        catchError(error => of(new fromStore.UpdateCatTIfail(error)))
      );
    })
  );
}
