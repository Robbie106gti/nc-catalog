import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'des-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="input-field col {{ size }}" >
    <textarea id="textarea1" [(ngModel)]="textarea" class="materialize-textarea" (keydown.enter)="Des()"></textarea>
    <label for="textarea1">{{ title }}</label>
  </div>`,
})
export class DesTextareaComponent {
  @Input() title: string;
  @Input() size: string;
  @Output() des = new EventEmitter<string>();
  textarea: string;

  Des(event) {
    this.des.emit(this.textarea);
  }
}
