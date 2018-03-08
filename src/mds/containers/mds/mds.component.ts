import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
selector: 'mds',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
mds Component
`,
})
export class MdsComponent {

  constructor() {}
}
