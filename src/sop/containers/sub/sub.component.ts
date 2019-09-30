import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';

@Component({
  selector: 'sub',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div *ngIf="(cat$ | async ) as cat">
<modal
*ngIf="add === true"
[modal]="modal"
[url]="(url$ | async)"
[pct]="(pct$ | async)"
[user]="(user$ | async)"
(close)="Close($event)"
(add)="New($event)"
(file)="Image($event)"
(edited)="Edited($event, cat)"
(movesop)="MoveSop($event)"
(del)="Remove($event)"
></modal>

<div class="section no-pad-bot no-pad-top" id="index-banner">
  <div class="card" id="top">
    <div class="container">
        <a routerLink="../" class="right"><i class="small material-icons">arrow_back</i></a>
        <div id="topic"><h1>{{ cat.title }}</h1></div>
        <span class="right"><i><small>Updated by:{{ cat.updatedBy }} - on: {{ cat.updatedAt }}</small></i></span><br>
    </div>
  </div>
</div>

<div class="row grid" *ngIf="(cats$ | async) as cards">
  <card class="card" *ngFor="let card of cards" [card]="card" [roles]="(roles$ | async)" (edit)="Edit($event)"></card>
</div>

<add-btn *ngIf="(roles$ | async)?.editor" (add)="Add($event, cat)"></add-btn>
</div>
`
})
export class SubComponent {
  modal: any;
  add: boolean;
  url$: Observable<string>;
  pct$: Observable<string>;
  user$: Observable<any>;
  roles$: Observable<any>;
  cats$: Observable<any>;
  cat$: Observable<any>;

  file: any;

  constructor(private store: Store<fromStore.SopsState>) {
    this.user$ = this.store.select(fromStore.getUserName);
    this.roles$ = this.store.select(fromStore.getUserRoles);
    this.cats$ = this.store.select(fromStore.getSelectedSops);
    this.url$ = this.store.select(fromStore.getUploadUrl);
    this.pct$ = this.store.select(fromStore.getUploadPercentage);
    this.cat$ = this.store.select(fromStore.getSelectedCat);
  }

  Edit(event) {
    this.add = true;
    this.modal = { title: 'Edit Category', action: event.title, edit: event };
    this.store.dispatch({ type: fromStore.UPLOAD_SUCCESS, payload: { bytesTransferred: 1100, totalBytes: 1100 } });
    this.store.dispatch({ type: fromStore.UPLOAD_URL_SUCCESS, payload: { url: event.image } });
    // console.log(event);
  }
  Edited(event) {
    // console.log(event)
    if (event.remove === true) {
      this.store.dispatch({ type: fromStore.SOP_DELETE, payload: event });
    } else {
      this.store.dispatch({ type: fromStore.UPDATE_SOP_TI, payload: event });
    }
    // console.log('event');
    this.add = false;
  }
  Remove(event) {
    // console.log(event)
    this.store.dispatch({ type: fromStore.SOP_DELETE, payload: event });
    this.add = false;
  }

  MoveSop(event) {
    // console.log('event:', event);
    if (event.edit.sub === event.newCat.title) {
      return confirm('The new Category is the same as the old Category, please select an other one.');
    }
    this.store.dispatch({ type: fromStore.MOVE_SOP, payload: event });
    this.add = false;
  }

  Add(event, cat) {
    this.modal = { title: 'Add a Category', action: '', edit: cat };
    this.add = event;
  }

  Close(event) {
    this.add = event;
  }

  New(event) {
    event = { ...event, name: this.file.name, size: this.file.size, type: this.file.type };
    // console.log(event);
    this.store.dispatch(new fromStore.AddSop(event));
    this.add = false;
  }

  Image(event) {
    // console.log(event);
    event = { ...event, dir: `/${event.edit.title}` };
    this.file = event.file;
    this.store.dispatch(new fromStore.Upload(event));
  }
}
