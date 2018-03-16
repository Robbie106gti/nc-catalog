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
selector: 'sop',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
<div *ngIf="(sop$ | async) as sop">

<sop-modal *ngIf="add === true" [modal]="modal" [user]="(user$ | async)"
(close)="Close($event)" (add)="Add($event)"></sop-modal>

  <div class="section no-pad-bot" id="index-banner">
    <div class="card" id="top">
      <div class="container">
          <a routerLink="../" class="right"><i class="small material-icons">arrow_back</i></a>
          <div id="topic"><h1>{{ sop.title }}</h1></div>
          <span class="right"><i><small>Updated by:{{ sop.updatedBy }} - on: {{ sop.updatedAt }}</small></i></span><br>
      </div>
    </div>
  </div>
  <code>{{ sop | json }}</code>
  <div class="row">
    <description-card *ngIf="sop.description" class="col s12 m6" [content]="sop.description"></description-card>
    <div class="col s12 m6"></div>
    <menu-btn (menu)="Menu($event)"></menu-btn>
  </div>
</div>
`,
})
export class SopComponent {
  sop$: Observable<any>;
  modal: { title: string, action: string, edit?: any, newTitle?: string };
  add: boolean;
  user$: Observable<string>;

  constructor(private store: Store<fromStore.SopsState>) {
    this.user$ = this.store.select(fromStore.getUserName);
    this.sop$ = this.store.select(fromStore.getSelectedSop);
  }

  Menu(event) {
    // console.log(event);
    this.modal = { title: `Add a ${event}`, action: event };
    this.add = true;
  }

  Close(event) {
    this.add = false;
  }

  Add(event) {
    this.store.dispatch({type: fromStore.ADD_TO_SOP, payload: event });
  }
}
