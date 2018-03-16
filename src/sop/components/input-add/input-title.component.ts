import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'input-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="input-field col {{ size }}" >
    <input id="title" type="text" class="validate" #cat [(ngModel)]="placeholder" (blur)="Name(cat.value)" (keyup.enter)="Name(cat.value)">
    <label for="title">{{ title }}</label>
  </div>`,
})
export class InputTitleComponent {
  @Input() title: string;
  @Input() placeholder: string;
  @Input() size: string;
  @Output() name = new EventEmitter<string>();

  Name(event) {
    this.name.emit(event);
  }
}
