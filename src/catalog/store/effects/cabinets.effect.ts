import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as cabinetsActions from '../actions/cabinets.action';
import * as fromServices from '../../services';
import { tap } from 'rxjs/operators/tap';

interface Ap {
    type: string;
    payload: any;
  }

@Injectable()
export class CabinetsEffects {
  constructor(
    private actions$: Actions,
    private firestoreService: fromServices.FirestoreService,
    private storageService: fromServices.StorageService
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
    switchMap(cab => {
    // tslint:disable-next-line:max-line-length
    return this.firestoreService.update(`structure/cabinets/${cab['payload'].item.content.sub.toLowerCase()}/${cab['payload'].item.content.id}`, { image: cab['payload'].path, updatedBy: cab['payload'].user.fullName})
     
    }
    )
  );

  @Effect()
  uploadCabImage$ = this.actions$.ofType(cabinetsActions.UPLOAD_CABINET).pipe(
    switchMap(event => {
      return this.storageService.uploadCab(event['payload'])
        .pipe(
          map(snap =>{ 
            // console.log(snap);
            return new cabinetsActions.UploadCabSuccess(snap)}
          ),
          catchError(error => of(new cabinetsActions.UploadCabFail(error)))
        );
    })
  );

  @Effect()
  DownloadURL$ = this.actions$.ofType(cabinetsActions.DOWNLOAD_URL).pipe(
    mergeMap(event => {
      return this.storageService.uploadCab(event['payload'])
        .pipe(
          map(snap =>{ 
            // console.log(snap);
            return new cabinetsActions.UploadCabSuccess(snap)}
          ),
          catchError(error => of(new cabinetsActions.UploadCabFail(error)))
        );
    })
  );

}
