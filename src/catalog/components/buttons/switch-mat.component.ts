import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'switch-mat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="switch">
    <label>
      Off
      <input type="checkbox" [checked]="active">
      <span class="lever"></span>
      On
    </label>
  </div>
  `
})
export class SwitchMatComponent {
  @Input() active: boolean;
}
