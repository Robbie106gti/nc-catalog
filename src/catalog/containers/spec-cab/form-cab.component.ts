import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { User } from '../../models/user.model';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { StorageService } from '../../services';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-cab',
  // styleUrls: ['products.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <edit-form-cab
  *ngIf="(toEdit$ | async) as edit"
  [user]="user" [edit]="edit" [pct]="(pct | async)" [pctfile]="(pctfile | async)" [url]="(downloadURL | async)"
  (close)="Close($event)" (file)="UploadFile($event)" (update)="Update($event)">
  </edit-form-cab>
  `,
})
export class FormCabComponent {
  toEdit$: Observable<any>;
  @Input() user: any;
  @Output() close = new EventEmitter<boolean>();
  // Main task
  pct: Observable<any>;
  pctfile: Observable<string>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;

  constructor(private store: Store<fromStore.ProductsState>, private storage: StorageService) {
    this.toEdit$ = this.store.select(fromStore.getToEditCabinet);
  }

  Close(event) { this.close.emit(true); this.store.dispatch({type: fromStore.CREATE_EDIT_CAB_DEL}); }

  UploadFile(event) {
   this.store.dispatch(new fromStore.UploadCab(event));
   this.pctfile = of(event.file.name);
   this.pct = this.store.select(fromStore.getUploadPct);
   this.snapshot = this.store.select(fromStore.getUploadStatus);
   this.downloadURL = this.store.select(fromStore.getDownloadUrl);
   this.snapshot.subscribe(snap => console.log(snap))
  }

  Update(event) {
    console.log(event);
  }

}
