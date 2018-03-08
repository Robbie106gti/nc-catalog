import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
selector: 'main',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
main Component
`,
})
export class MainComponent {

  constructor() {}
}
