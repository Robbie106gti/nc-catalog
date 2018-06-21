import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'input-add',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="input-field col {{ size }}" >
    <input id="title" type="text" class="validate" #cat [(ngModel)]="title" (blur)="Name(cat.value)" (keyup.enter)="Name(cat.value)">
    <label for="title">{{ title || 'Category name' }}</label>
  </div>`
})
export class InputAddComponent {
  @Input() title: string;
  @Input() size: string;
  @Output() name = new EventEmitter<string>();

  Name(event) {
    this.name.emit(event);
  }
}
