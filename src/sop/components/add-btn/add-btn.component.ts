import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
selector: 'add-btn',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
<div class="fixed-action-btn">
  <a class="btn-floating btn-large waves-effect waves-light red" (click)="Add()"><i class="material-icons">add</i></a>
</div>
`,
})
export class AddBtnComponent {
  @Output() add = new EventEmitter<boolean>();

  Add() {
    this.add.emit(true);
  }
}
