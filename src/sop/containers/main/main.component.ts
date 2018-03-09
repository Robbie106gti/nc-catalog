import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
selector: 'main',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
main Component
<modal *ngIf="add === true" [modal]="{ title: 'Add a Catagory', action: 'Catagory name' }" (close)="Close($event)"></modal>
<add-btn (add)="Add($event)"></add-btn>
`,
})
export class MainComponent {
  add: boolean;
  constructor() {}

  Add(event) {
    this.add = event;
  }

  Close(event) {
    this.add = event;
  }
}
