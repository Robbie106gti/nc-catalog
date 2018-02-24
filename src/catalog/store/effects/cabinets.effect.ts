import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromStore from '../../store';
import * as fromRoot from '../../../app/store';
import * as cabinetsActions from '../actions/cabinets.action';
import * as fromServices from '../../services';

interface Ap {
    type: string;
    payload: any;
  }

@Injectable()
export class CabinetsEffects {
  constructor(
    private actions$: Actions,
    private firestoreService: fromServices.FirestoreService,
    private storageService: fromServices.StorageService,
    private store: Store<fromStore.ProductsState>
  ) {}

  @Effect()
  loadCabinets$ = this.actions$.ofType(
      cabinetsActions.LOAD_CABINETS,
    ).pipe(
    switchMap(cabinets => {
      return this.firestoreService
        .colWithIds$(`structure/cabinets/${cabinets['payload'].toLowerCase()}`)
        .pipe(
          map(bases => {
            const base = bases.map(b => {
              return {...b, 'sub': cabinets['payload'], 'cabinet': true };
            });
            return new cabinetsActions.LoadCabinetsSuccess(base);
          }),
          catchError(error => of(new cabinetsActions.LoadCabinetsFail(error)))
        );
    })
  );
  
  @Effect()
  updateCabinet$ = this.actions$.ofType(cabinetsActions.UPDATE_CABINET)
  .pipe(
    switchMap(updates => {
      console.log(updates);
      return this.store.select(fromStore.getSelectedCabinetItem)
        .pipe(
          map(cab => {
            let update = updates['payload'];
            let cat = update.sub.toLowerCase();
            let value;
            switch(cat) {
              case 'specifications': {
                cab.specifications = cab.specifications ? cab.specifications : [];
                cab.specifications.push(update.id);
                value = cab.specifications;
                break;
              }
              case 'iwhd': {
                cab.iwhd = cab.iwhd ? cab.iwhd : {};
                let key = update.title.toLowerCase();
                if (key == 'height') { key = 'heights' }
                if (key == 'width') { key = 'widths'}
                if (key == 'depth') { key = 'depths'}
                cab.iwhd[key] = update.id;
                value = cab.iwhd;
                break;
              }
            }
            console.log({[cat]: value, cab, update});
            return this.firestoreService.update(`structure/cabinets/${cab.sub.toLowerCase()}/${cab.id}`, { [cat]: value });
          }),
          map(cab => new cabinetsActions.UpdateEditCabSuccess({...cab})),
          catchError(error => of(new cabinetsActions.UpdateEditCabFail(error)))
        );
    }
    )
  );

  @Effect()
  DownloadURL$ = this.actions$.ofType(cabinetsActions.DOWNLOAD_URL).pipe(
    mergeMap(event => {
      return this.storageService.uploadCab(event['payload'])
        .pipe(
          map(snap => { 
            // console.log(snap);
            return new cabinetsActions.UploadCabSuccess(snap);
          }),
          catchError(error => of(new cabinetsActions.UploadCabFail(error)))
        );
    })
  );

}
