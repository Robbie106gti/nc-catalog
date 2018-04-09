import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { of } from 'rxjs/observable/of';

@Component({
selector: 'main',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
<modal *ngIf="add === true" [modal]="modal"
[url]="(url$ | async)" [pct]="(pct$ | async)" [user]="(user$ | async)"
(close)="Close($event)" (add)="New($event)" (file)="Image($event)" (edited)="Edited($event)"></modal>

<div class="row grid" *ngIf="(cats$ | async) as cards">
  <card class="card" *ngFor="let card of cards" [card]="card" (edit)="Edit($event)"></card>
</div>

<add-btn (add)="Add($event)"></add-btn>
`,
})
export class MainComponent {
  add: boolean;
  modal: any;
  url$: Observable<string>;
  pct$: Observable<any>;
  user$: Observable<string>;
  cats$: Observable<any>;

  file: any;

  constructor(private store: Store<fromStore.SopsState>) {
    this.user$ = this.store.select(fromStore.getUserName);
    this.cats$ = this.store.select(fromStore.getCats);
    this.url$ = this.store.select(fromStore.getUploadUrl);
    this.pct$ = this.store.select(fromStore.getUploadPercentage);
  }

  Edit(event) {
    console.log(event);
    this.add = true;
    this.modal = { title: 'Edit Category', action: event.title, edit: event };
    this.store.dispatch({type: fromStore.UPLOAD_SUCCESS, payload: { bytesTransferred: 1100, totalBytes: 1100 }});
    this.store.dispatch({type: fromStore.UPLOAD_URL_SUCCESS, payload: { url: event.image }});
  }

  Add(event) {
    this.add = event;
    this.modal = { title: 'Add a Category', action: '' };
    this.store.dispatch({type: fromStore.UPLOAD_SUCCESS, payload: { bytesTransferred: 0, totalBytes: 1100 }});
    this.store.dispatch({type: fromStore.UPLOAD_URL_SUCCESS, payload: { url: '' }});
  }

  Close(event) { this.add = event; }
  Edited(event) {
    this.store.dispatch({ type: fromStore.UPDATE_CAT_TI, payload: event });
    this.add = false;
  }

  New(event) {
    event = { ...event, name: this.file.name, size: this.file.size, type: this.file.type };
    this.store.dispatch(new fromStore.AddCatSuccess(event));
    this.add = false;
  }

  Image(event) {
    event = { ...event, dir: '/main'};
    this.file = event.file;
    this.store.dispatch(new fromStore.Upload(event));
  }
}
