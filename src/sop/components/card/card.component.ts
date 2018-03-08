import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
selector: 'card',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
<div class="card">{{ title }}</div>
`,
})
export class CardComponent {
  title: any;
}
