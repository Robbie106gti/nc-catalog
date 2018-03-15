import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
selector: 'edit-btn',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
  <i class="material-icons pointer" (click)="Edit()">edit</i>
`
})
export class EditBtnComponent {
  @Output() edit = new EventEmitter<boolean>();

  Edit() {
    this.edit.emit(true);
  }
}
