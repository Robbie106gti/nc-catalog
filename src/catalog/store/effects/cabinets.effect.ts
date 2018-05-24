import { Injectable, Pipe } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, mergeMap, take, delayWhen, takeWhile } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as common from '../../utils/common';

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
  loadCabinets$ = this.actions$.ofType(cabinetsActions.LOAD_CABINETS).pipe(
    switchMap((cabinets: Ap) => {
      return this.firestoreService.colWithIds$(`structure/cabinets/${cabinets.payload.split('-').join(' ')}`).pipe(
        map(bases => {
          const base = bases.map(b => {
            return { ...b, sub: cabinets.payload, cabinet: true };
          });
          return new cabinetsActions.LoadCabinetsSuccess(base);
        }),
        catchError(error => of(new cabinetsActions.LoadCabinetsFail(error)))
      );
    })
  );

  @Effect()
  updateCabinet$ = this.actions$.ofType(cabinetsActions.UPDATE_CABINET).pipe(
    switchMap(updates => {
      // console.log(updates); this.store.select(fromStore.getSelectedCabinetItem)
      return this.store.select(fromStore.getSelectedCabinetItem).pipe(
        take(1),
        map(cab => {
          const update = updates['payload'];
          // console.log(update);
          const cat = update.sub.toLowerCase();
          const versions = cab.versions;
          let value;
          switch (cat) {
            case 'specifications': {
              if (update.version === 'main') {
                cab.specifications = cab.specifications ? cab.specifications : [];
                cab.specifications.push(update.id);
                value = { [cat]: cab.specifications };
              } else {
                const spec = versions[update.version].specifications ? versions[update.version].specifications : [];
                spec.push(update.id);
                versions[update.version].specifications = spec;
                value = { versions };
              }
              break;
            }
            case 'iwhd': {
              let key = update.title.toLowerCase();
              if (update.version === 'main') {
                cab.iwhd = cab.iwhd ? cab.iwhd : {};
                // tslint:disable-next-line:triple-equals
                if (key == 'height') {
                  key = 'heights';
                }
                // tslint:disable-next-line:triple-equals
                if (key == 'width') {
                  key = 'widths';
                }
                // tslint:disable-next-line:triple-equals
                if (key == 'depth') {
                  key = 'depths';
                }
                cab.iwhd[key] = update.id;
                value = { [cat]: cab.iwhd };
              } else {
                const iwhd = versions[update.version].iwhd ? versions[update.version].iwhd : {};
                // tslint:disable-next-line:triple-equals
                if (key == 'height') {
                  key = 'heights';
                }
                // tslint:disable-next-line:triple-equals
                if (key == 'width') {
                  key = 'widths';
                }
                // tslint:disable-next-line:triple-equals
                if (key == 'depth') {
                  key = 'depths';
                }
                iwhd[key] = update.id;
                versions[update.version].iwhd = iwhd;
                value = { versions };
              }
              break;
            }
            case 'description': {
              value = { [cat]: update.value };
              break;
            }
            case 'notes': {
              if (update.version === 'main') {
                cab.notes = cab.notes ? cab.notes : [];
                cab.notes.push(update.value.id);
                value = { [cat]: cab.notes };
              } else {
                const notes = versions[update.version].notes ? versions[update.version].notes : [];
                notes.push(update.value.id);
                versions[update.version].notes = notes;
                value = { versions };
              }
              break;
            }
            case 'addons': {
              if (update.version === 'main') {
                cab.addons = cab.addons ? cab.addons : [];
                cab.addons.push(update.value.id);
                value = { [cat]: cab.addons };
              } else {
                const addons = versions[update.version].addons ? versions[update.version].addons : [];
                addons.push(update.value.id);
                versions[update.version].addons = addons;
                value = { versions };
              }
              break;
            }
            case 'onoff': {
              if (update.id === 'none') {
                value = { active: update.value };
              } else {
                versions[update.id].active = update.value;
                value = { versions };
              }
              break;
            }
          }
          this.firestoreService.update(`structure/cabinets/${common.prepareFirestore(cab.sub)}/${cab.id}`, {
            ...value,
            updatedBy: update.user.fullName
          });
          return new cabinetsActions.UpdateEditCabSuccess({
            ...cab,
            update,
            Updated: { ...value, updatedBy: update.user.fullName }
          });
        }),
        catchError(error => of(new cabinetsActions.UpdateEditCabFail(error)))
      );
    })
  );

  @Effect()
  RemoveFromCab$ = this.actions$.ofType(cabinetsActions.REMOVE_FROM_CABINET).pipe(
    switchMap(updates => {
      // console.log(updates);
      return this.store.select(fromStore.getSelectedCabinetItem).pipe(
        take(1),
        map(cab => {
          const update = updates['payload'];
          const cat = update.sub.toLowerCase();
          const versions = cab.versions;
          let value;
          switch (cat) {
            case 'specifications': {
              if (update.version === 'main') {
                value = cab.specifications.filter(item => item !== update.id);
                value = { [cat]: value };
              } else {
                let spec = versions[update.version].specifications;
                spec = spec.filter(item => item !== update.id);
                versions[update.version].specifications = spec;
                value = { versions };
              }
              break;
            }
            case 'iwhd': {
              let key = update.title.toLowerCase();
              // tslint:disable-next-line:triple-equals
              if (key == 'height') {
                key = 'heights';
              }
              // tslint:disable-next-line:triple-equals
              if (key == 'width') {
                key = 'widths';
              }
              // tslint:disable-next-line:triple-equals
              if (key == 'depth') {
                key = 'depths';
              }
              if (update.version === 'main') {
                value = cab.iwhd;
                delete value[key];
                value = { [cat]: value };
              } else {
                delete versions[update.version].iwhd[key];
                value = { versions };
              }
              break;
            }
          }
          this.firestoreService.update(`structure/cabinets/${common.prepareFirestore(cab.sub)}/${cab.id}`, {
            ...value,
            updatedBy: update.user.fullName
          });
          return new cabinetsActions.UpdateEditCabSuccess({
            ...cab,
            update,
            Updated: { key: cat, value, toDo: update.toDo }
          });
        }),
        catchError(error => of(new cabinetsActions.UpdateEditCabFail(error)))
      );
    })
  );

  @Effect()
  UploadCab$ = this.actions$.ofType(cabinetsActions.UPLOAD_CABINET).pipe(
    switchMap(event => {
      return this.storageService.uploadCab(event['payload']).pipe(
        map(snap => {
          return new cabinetsActions.UploadCabSuccess(snap);
        }),
        catchError(error => of(new cabinetsActions.UploadCabFail(error)))
      );
    })
  );

  @Effect()
  DownloadUrl$ = this.actions$.ofType(cabinetsActions.DOWNLOAD_URL).pipe(
    switchMap(url => {
      // console.log(url);
      const ob = url['payload'];
      const image = {
        url: ob.url,
        uploadBy: ob.user.fullName,
        title: ob.title,
        item: ob.item.content,
        user: ob.user,
        fileName: ob.file.name,
        fileSize: ob.file.size,
        fileType: ob.file.type,
        type: ob.type,
        newFileName: ob.newFileName,
        metaData: ob.customMetadata,
        path: ob.path,
        version: ob.version
      };
      return this.store.select(fromStore.getSelectedCabinetItem).pipe(
        take(1),
        map(cab => {
          this.firestoreService.add('updates/images/uploads', image);
          if (ob.version === 'main') {
            this.firestoreService.update(`structure/cabinets/${common.prepareFirestore(cab.sub)}/${cab.id}`, {
              image: image.url,
              updatedBy: image.uploadBy
            });
            // console.log({ 'image': image.url, 'updatedBy': image.uploadBy, string: `cabinets/${cab.sub}/${cab.id}` });
          } else {
            const images = cab.versions[ob.version].images ? cab.versions[ob.version].images : {};
            const title = image.type === 'spec' ? 'Spec' : '';
            cab.versions[ob.version].images = {
              ...images,
              [image.type]: { title, image: image.url }
            };
            this.firestoreService.update(`structure/cabinets/${common.prepareFirestore(cab.sub)}/${cab.id}`, {
              versions: cab.versions,
              updatedBy: image.uploadBy
            });
            // console.log({ versions: cab.versions, 'updatedBy': image.uploadBy, string: `cabinets/${cab.sub}/${cab.id}` });
          }
          return new cabinetsActions.DownloadUrlSuccess(image);
        }),
        catchError(error => of(new cabinetsActions.DownloadUrlFail(error)))
      );
    })
  );
}
