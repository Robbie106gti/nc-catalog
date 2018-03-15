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
  <menu-btn (menu)="Menu($event)"></menu-btn>
</div>

`,
})
export class SopComponent {
  sop$: Observable<any>;

  constructor(private store: Store<fromStore.SopsState>) {
    this.sop$ = this.store.select(fromStore.getSelectedSop);
  }

  Menu(event) {
    console.log(event);
  }
}
