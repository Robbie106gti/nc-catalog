import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'on-off',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="switch">
    <label>
      Off
      <input type="checkbox" *ngIf="active; else inactive" checked>
      <span class="lever"></span>
      On
    </label>
  </div>

  <ng-template #inactive><input type="checkbox"></ng-template>
  `,
})
export class OnOffComponent {
  @Input() edit: any;
  @Input() active: any;
}
