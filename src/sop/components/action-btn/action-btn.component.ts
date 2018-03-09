import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
selector: 'action-btn',
changeDetection: ChangeDetectionStrategy.OnPush,
templateUrl: './action-btn.html'
})
export class ActionBtnComponent {
  @Input() chip: any;
}
