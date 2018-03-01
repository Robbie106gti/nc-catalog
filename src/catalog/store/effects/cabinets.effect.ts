import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, mergeMap, take } from 'rxjs/operators';
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

/*   @Effect()
  batchEditSection$ = this.actions$.ofType(cabinetsActions.LOAD_CABINETS_SUCCESS).pipe(
    take(1),
    map(cabs => {
      console.log(cabs);
      let id = 1;
      cabs['payload'].map(cab => {
        const update = cab;
        const versions = update.versions ? update.versions : {};
        const heights = update.heights.map(h => {
          const title = h.version ? h.version : h.height;
          const base = { 'active': true, title, 'id': title };
          versions[title] = versions[title] ? {...versions[title], ...base } : { ...base };
          return { ...h, title, 'id': title };
        });
        update.heights = heights;
        update.versions = versions;
        const increments = 'SKR683fyZIN2ndh9C1as';
        const iwhd = { increments };
        if (update.iwhd) {
          if (update.iwhd.increments) { iwhd.increments = update.iwhd.increments ? update.iwhd.increments : increments; }
          if (update.iwhd.widths) { iwhd['widths'] = update.iwhd.widths; }
          if (update.iwhd.heights) { iwhd['heights'] = update.iwhd.heights; }
          if (update.iwhd.depths) { iwhd['depths'] = update.iwhd.depths; }
        }
        update.iwhd = iwhd;
        update.active = true;
        delete update.crudInfo;
        delete update.updatedAt;
        console.log(update);
        console.log(`${id} of ${cabs['payload'].length}`);
        id++;
         // this.firestoreService.update(`structure/cabinets/${cab.sub.toLowerCase()}/${cab.id}`, update);
      });
    })
  ); */

  @Effect()
  updateCabinet$ = this.actions$.ofType(cabinetsActions.UPDATE_CABINET)
  .pipe(
    switchMap(updates => {
      // console.log(updates);
      return this.store.select(fromStore.getSelectedCabinetItem)
        .pipe(
          take(1),
          map(cab => {
            const update = updates['payload'];
            const cat = update.sub.toLowerCase();
            let value;
            switch (cat) {
              case 'specifications': {
                cab.specifications = cab.specifications ? cab.specifications : [];
                cab.specifications.push(update.id);
                value = { [cat]: cab.specifications};
                break;
              }
              case 'iwhd': {
                cab.iwhd = cab.iwhd ? cab.iwhd : {};
                let key = update.title.toLowerCase();
                // tslint:disable-next-line:triple-equals
                if (key == 'height') { key = 'heights'; }
                // tslint:disable-next-line:triple-equals
                if (key == 'width') { key = 'widths'; }
                // tslint:disable-next-line:triple-equals
                if (key == 'depth') { key = 'depths'; }
                cab.iwhd[key] = update.id;
                value = { [cat]: cab.iwhd };
                break;
              }
              case 'description': {
                value = { [cat]: update.value };
                break;
              }
              case 'onoff': {
                if (update.id === 'none') {
                  value = { active: update.value };
                } else {
                  const versions = cab.versions;
                  versions[update.id].active = update.value;
                  value =  {versions};
                }
                break;
              }
            }
            // console.log({[cat]: value, cab, update});
            this.firestoreService.update(`structure/cabinets/${cab.sub.toLowerCase()}/${cab.id}`, { ...value, updatedBy: update.user.fullName });
            return new cabinetsActions.UpdateEditCabSuccess({...cab, update, 'Updated': { ...value, updatedBy: update.user.fullName} });
          }),
          catchError(error => of(new cabinetsActions.UpdateEditCabFail(error)))
        );
    }
    )
  );

  @Effect()
  RemoveFromCab$ = this.actions$.ofType(cabinetsActions.REMOVE_FROM_CABINET).pipe(
    switchMap(updates => {
      console.log(updates);
      return this.store.select(fromStore.getSelectedCabinetItem)
        .pipe(
          take(1),
          map(cab => {
            const update = updates['payload'];
            const cat = update.sub.toLowerCase();
            let value;
            switch (cat) {
              case 'specifications': {
                value = cab.specifications.filter(item => item !== update.id);
                break;
              }
              case 'iwhd': {
                value = cab.iwhd;
                let key = update.title.toLowerCase();
                // tslint:disable-next-line:triple-equals
                if (key == 'height') { key = 'heights'; }
                // tslint:disable-next-line:triple-equals
                if (key == 'width') { key = 'widths'; }
                // tslint:disable-next-line:triple-equals
                if (key == 'depth') { key = 'depths'; }
                delete value[key];
                break;
              }
            }
            this.firestoreService.update(`structure/cabinets/${cab.sub.toLowerCase()}/${cab.id}`, { [cat]: value });
            return new cabinetsActions.UpdateEditCabSuccess({...cab, update, 'Updated': { 'key': cat, value, 'toDo': update.toDo }});
          }),
          catchError(error => of(new cabinetsActions.UpdateEditCabFail(error)))
        );
      })
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
