import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'input-add',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="input-field col {{ size }}" >
    <input id="title" type="text" class="validate">
    <label for="title">{{ title }}</label>
  </div>`,
})
export class InputAddComponent {
  @Input() title: string;
  @Input() size: string;

}
