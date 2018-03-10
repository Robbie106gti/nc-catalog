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
template: `hello
<modal *ngIf="add === true" [modal]="{ title: 'Add a Catagory', action: 'Catagory name' }"
[url]="(url$ | async)" [pct]="pct"
(close)="Close($event)" (add)="New($event)" (file)="Image($event)"></modal>
<add-btn (add)="Add($event)"></add-btn>
`,
})
export class MainComponent {
  add: boolean;
  url$: Observable<string>;
  pct = 100;
  file: any;

  constructor(private store: Store<fromStore.SopsState>) {
    // this.url = 'https://usa.denon.com/Assets/images/Support_Warranty_Extended.jpg';
    this.url$ = this.store.select(fromStore.getUploadUrl);
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
    event = {...event, dir: '/main'};
    this.file = event;
    this.store.dispatch(new fromStore.Upload(event));
  }
}
