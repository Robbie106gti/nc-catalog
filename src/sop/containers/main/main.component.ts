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
selector: 'main',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
<modal *ngIf="add === true" [modal]="{ title: 'Add a Category', action: 'Catagory name' }"
[url]="(url$ | async)" [pct]="(pct$ | async)" [user]="(user$ | async)"
(close)="Close($event)" (add)="New($event)" (file)="Image($event)"></modal>

<div class="row">
  <card *ngFor="let cat of (cats$ | async)" [card]="cat" class="col s4 m3 l2"></card>
</div>

<add-btn (add)="Add($event)"></add-btn>
`,
})
export class MainComponent {
  add: boolean;
  url$: Observable<string>;
  pct$: Observable<string>;
  user$: Observable<string>;
  cats$: Observable<any>;

  file: any;

  constructor(private store: Store<fromStore.SopsState>) {
    this.user$ = this.store.select(fromStore.getUserName);
    this.cats$ = this.store.select(fromStore.getCats);
    this.url$ = this.store.select(fromStore.getUploadUrl);
    this.pct$ = this.store.select(fromStore.getUploadPercentage);
  }

  Add(event) {
    this.add = event;
  }

  Close(event) {
    this.add = event;
    console.log(event);
  }

  New(event) {
    event = { ...event, name: this.file.name, size: this.file.size, type: this.file.type };
    console.log(event);
    return null;
  }

  Image(event) {
    event = { ...event, dir: '/main'};
    console.log(event);
    this.file = event.file;
    this.store.dispatch(new fromStore.Upload(event));
  }
}
