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

@Component({
selector: 'sub',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
<div *ngIf="(cat$ | async ) as cat">
<modal *ngIf="add === true" [modal]="modal"
[url]="(url$ | async)" [pct]="(pct$ | async)" [user]="(user$ | async)"
(close)="Close($event)" (add)="New($event)" (file)="Image($event)" (edited)="Edited($event, cat)"></modal>

<div class="section no-pad-bot" id="index-banner">
  <div class="card" id="top">
    <div class="container">
        <a routerLink="../" class="right"><i class="small material-icons">arrow_back</i></a>
        <div id="topic"><h1>{{ cat.title }}</h1></div>
        <span class="right"><i><small>Updated by:{{ cat.updatedBy }} - on: {{ cat.updatedAt }}</small></i></span><br>
    </div>
  </div>
</div>

<div class="row" *ngIf="(cats$ | async) as cards">
  <card class="col s4 m3 l2" *ngFor="let card of cards" [card]="card" (edit)="Edit($event)"></card>
</div>

<add-btn (add)="Add($event)"></add-btn>
</div>
`,
})
export class SubComponent {
  modal: any;
  add: boolean;
  url$: Observable<string>;
  pct$: Observable<string>;
  user$: Observable<string>;
  cats$: Observable<any>;
  cat$: Observable<any>;

  file: any;

  constructor(private store: Store<fromStore.SopsState>) {
    this.user$ = this.store.select(fromStore.getUserName);
    this.cats$ = this.store.select(fromStore.getSelectedSops);
    this.url$ = this.store.select(fromStore.getUploadUrl);
    this.pct$ = this.store.select(fromStore.getUploadPercentage);
    this.cat$ = this.store.select(fromStore.getSelectedCat);
  }

  Edit(event) {
    this.add = true;
    this.modal = { title: 'Edit Category', action: event.title, edit: event };
    this.store.dispatch({type: fromStore.UPLOAD_SUCCESS, payload: { bytesTransferred: 1100, totalBytes: 1100 }});
    this.store.dispatch({type: fromStore.UPLOAD_URL_SUCCESS, payload: { url: event.image }});
    console.log(event);
  }
  Edited(event) {
    this.store.dispatch({ type: fromStore.UPDATE_SOP_TI, payload: event });
    console.log(event);
    this.add = false;
  }

  Add(event) {
    this.modal = { title: 'Add a Category', action: '' };
    this.add = event;
  }

  Close(event) {
    this.add = event;
  }

  New(event) {
    event = { ...event, name: this.file.name, size: this.file.size, type: this.file.type };
    console.log(event);
    this.store.dispatch(new fromStore.AddSop(event));
    this.add = false;
  }

  Image(event) {
    event = { ...event, dir: '/main'};
    this.file = event.file;
    this.store.dispatch(new fromStore.Upload(event));
  }
}