import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap, filter, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromRoot from '../../../app/store';
import * as editActions from '../actions';
import * as fromServices from '../../services';
import { forEach } from '../../../../node_modules/@firebase/util';

interface Ap {
  type: string;
  payload: any;
}

@Injectable()
export class EditEffects {
  constructor(
    private store: Store<fromStore.ProductsState>,
    private firestoreService: fromServices.FirestoreService,
    private actions$: Actions
  ) {}

  @Effect()
  edit$ = this.actions$.ofType(editActions.UPDATE_TITLE).pipe(
    switchMap((action: Ap) => {
      return this.store.select(fromRoot.getUserData).pipe(
        map(user => {
          // console.log(user);
          const item = action.payload;
          const cab = item.cabinet ? 'cabinets' : 'category';
          const db_loc = item.sub
            ? `structure/${cab}/${item.sub.split('-').join(' ')}/${item.id}`
            : `categories/${item.id}`;
          this.firestoreService.update(db_loc, { title: item.title, updatedBy: user.fullName });
          return new editActions.EditSuccess(item);
        })
      );
    }),
    catchError(error => of(new editActions.EditFail(error)))
  );

  @Effect()
  editDoor$ = this.actions$.ofType(editActions.EDIT_DOOR).pipe(
    switchMap((action: Ap) => {
      return this.store.select(fromRoot.getUserData).pipe(
        map(user => {
          // console.log(user);
          const arrayDoors = ['Form 25', 'Form 57', 'Form 75', 'Radius 8', 'Radius 12', 'Camber'];
          const door = action.payload;
          const db_loc = `structure/category/doors`;
          // arrayDoors.forEach(title => {
          //  door.title = title;
          //  console.log(title);
          //  this.firestoreService.add(db_loc, { ...door, updatedBy: user.fullName });
          //});
          return new editActions.EditSuccess({ title: 'door added', item: door.title });
        })
      );
    }),
    catchError(error => of(new editActions.EditFail(error)))
  );
}
