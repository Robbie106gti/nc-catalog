import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
selector: 'new',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
new Component
`,
})
export class NewComponent {

  constructor() {}
}
