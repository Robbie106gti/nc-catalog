import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'des-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div *ngIf="title" class="input-field col {{ size || 's6' }}" >
    <textarea id="textarea1" [(ngModel)]="textarea" class="materialize-textarea" (keydown.enter)="Des()" (blur)="Des()"></textarea>
    <label for="textarea1">{{ title }}</label>
  </div>`
})
export class DesTextareaComponent {
  @Input() title: string;
  @Input() size: string;
  @Input() textarea: string;
  @Output() des = new EventEmitter<string>();

  Des(event) {
    this.des.emit(this.textarea);
  }
}
