import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { User } from '../../models/user.model';
import { of } from 'rxjs/observable/of';

import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'spec-cab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './spec-cab.component.html',
})
export class SpecCabComponent implements OnInit {
  content$: Observable<any>;
  toEdit$: Observable<any>;
  content: any;
  toEdit: any;
  specs: any;
  iwhd: any;
  notes: any;
  addons: any;
  user$: Observable<User>;
  param$: Observable<any>;
  editing: Boolean;
  results$: Observable<any>;

  pct: Observable<any>;
  pctfile: Observable<string>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;

  constructor(private store: Store<fromStore.ProductsState>, private storage: StorageService) { }

  ngOnInit() {
    this.user$ = this.store.select(fromStore.getUserData);
    this.param$ = this.store.select(fromStore.getRouterParams);
    this.results$ = this.store.select(fromStore.getSearchResults);
    this.Take(1);
   }

   Edit(event) {
     this.store.dispatch({type: fromStore.CREATE_EDIT_CAB, payload: event});
     this.editing = true;
     this.Take(1);
   }

   Close(event) {
     this.editing = false;
     this.store.dispatch({type: fromStore.CREATE_EDIT_CAB_DEL});
     this.Take(1);
   }

   Search(event) {
    this.store.dispatch({ type: fromStore.SEARCH, payload: event });
    this.Take(1);
   }

   Update(event, user) {
     // console.log(event);
    event = { ...event, user };
    this.store.dispatch({ type: fromStore.UPDATE_CABINET, payload: event });
    this.Take(3);
   }

   Remove(event, user) {
    event = {...event, user };
     this.store.dispatch({ type: fromStore.REMOVE_FROM_CABINET, payload: event });
     this.Take(3);
   }

   Take(count) {
    this.store.select(fromStore.getSelectedCabinetItem).take(count).subscribe(c => this.content = c);
    this.store.select(fromStore.getToEditCabinet).take(count).subscribe(e => this.toEdit = e);
    this.store.select(fromStore.getCabSpecs).take(count).subscribe(s => this.specs = s);
    this.store.select(fromStore.getCabIWHDs).take(count).subscribe(i => this.iwhd = i);
    this.store.select(fromStore.getCabNotes).take(count).subscribe(n => this.notes = n);
    this.store.select(fromStore.getCabAddons).take(count).subscribe(a => this.addons = a);
   }

   UploadFile(event, user) {
    event = {...event, user };
    this.store.dispatch(new fromStore.UploadCab(event));
    // this.storage.uploadCab(event);
    this.pctfile = of(event.file.name);
    this.pct = this.store.select(fromStore.getUploadPct);
    this.snapshot = this.store.select(fromStore.getUploadStatus);
    this.downloadURL = this.store.select(fromStore.getDownloadUrl);
    // this.snapshot.subscribe(snap => console.log(snap));
   }
}
