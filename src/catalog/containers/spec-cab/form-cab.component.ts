import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { User } from '../../models/user.model';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'form-cab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <i class="material-icons pointer offset" (click)="Edit({content: content})">edit</i>
  <edit-form-cab
  *ngIf="editing" [specials]="specials$ | async"
  [content]="content" [user]="user" [pct]="pct" [pctfile]="pctfile" [url]="downloadURL" [results$]="results$"
  (close)="Close($event)" (file)="UploadFile($event)" (update)="Update($event)" (search)="Search($event)" (remove)="Remove($event)"
  ></edit-form-cab>
  `,
  styles: [
    `
      .offset {
        position: relative;
        right: 1.2em;
        bottom: 0.8em;
      }
    `
  ]
})
export class FormCabComponent {
  editing: Boolean;
  @Input()
  content: any;
  @Input()
  user: any;
  @Output()
  edit = new EventEmitter<boolean>();

  param$: Observable<any>;
  results$: Observable<any>;
  user$: Observable<User>;
  specials$: Observable<any>;

  pct: Observable<any>;
  pctfile: Observable<string>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;

  constructor(private store: Store<fromStore.ProductsState>) {
    this.param$ = this.store.select(fromStore.getRouterParams);
    this.results$ = this.store.select(fromStore.getSearchResults);
    this.specials$ = this.store.select(fromStore.getCabSpecials);
  }

  Edit(event) {
    this.store.dispatch({ type: fromStore.CREATE_EDIT_CAB, payload: event });
    this.store.dispatch({ type: fromStore.LOAD_HELPERS_ADDONS });
    this.store.dispatch({ type: fromStore.LOAD_HELPERS_IWHD });
    this.store.dispatch({ type: fromStore.LOAD_HELPERS_NOTES });
    this.store.dispatch({ type: fromStore.LOAD_HELPERS_SPEC });
    this.editing = true;
  }

  Close(event) {
    this.editing = false;
    this.store.dispatch({ type: fromStore.CREATE_EDIT_CAB_DEL });
  }

  Update(event) {
    //console.log(event);
    event = { ...event, user: this.user };
    this.store.dispatch({ type: fromStore.UPDATE_CABINET, payload: event });
    this.edit.emit(true);
  }
  Search(event) {
    this.store.dispatch({ type: fromStore.SEARCH, payload: event });
  }
  Remove(event) {
    // console.log(event);
    this.store.dispatch({ type: fromStore.REMOVE_FROM_CABINET, payload: event });
  }

  UploadFile(event) {
    event = { ...event, user: this.user };
    this.store.dispatch(new fromStore.UploadCab(event));
    // this.storage.uploadCab(event);
    this.pctfile = of(event.file.name);
    this.pct = this.store.select(fromStore.getUploadPct);
    this.snapshot = this.store.select(fromStore.getUploadStatus);
    this.downloadURL = this.store.select(fromStore.getDownloadUrl);
    // this.snapshot.subscribe(snap => console.log(snap));
  }
}
