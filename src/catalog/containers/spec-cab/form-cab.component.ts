import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { User } from '../../models/user.model';
import { tap } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-cab',
  // styleUrls: ['products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <edit-form-cab
  *ngIf="(toEdit$ | async) as edit"
  [user]="user" [edit]="edit" [pct]="(percentage | async)" [url]="(downloadURL | async)"
  (close)="Close($event)" (file)="UploadFile($event)">
  </edit-form-cab>
  `,
})
export class FormCabComponent {
  toEdit$: Observable<any>;
  @Input() user: any;
  @Output() close = new EventEmitter<boolean>();
  // Main task
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;

  constructor(private store: Store<fromStore.ProductsState>, private storage: AngularFireStorage) {
    this.toEdit$ = this.store.select(fromStore.getToEditCabinet);
  }

  Close(event) { this.close.emit(true); this.store.dispatch({type: fromStore.CREATE_EDIT_CAB_DEL}); }

  UploadFile(event) {
   console.log(event);
   const file = event.file;
   // The storage path
   const path = `cabinets/${event.item.content.sub}/${event.item.content.title}/${new Date().getTime()}_${file.name}`;
   // Totally optional metadata
   const customMetadata = {
     uploadBy: event.user.fullName, title: event.title, cat: 'cabinets', subcategory: event.item.content.sub, type: event.type
    };
   // The main task
   this.task = this.storage.upload(path, file, { customMetadata });
   // Progress monitoring
   this.percentage = this.task.percentageChanges();
   this.snapshot   = this.task.snapshotChanges();
   // The file's download URL
   this.downloadURL = this.task.downloadURL();
   this.snapshot.subscribe(url => console.log(url));
   // this.store.dispatch({type: fromStore.UPDATE_CABINET, payload: { ...event, path }});
  }

}
