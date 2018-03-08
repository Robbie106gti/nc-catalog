import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
selector: 'chip',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
<div class="chip">{{ chip }}</div>
`,
})
export class ChipComponent {
  @Input() chip: any;
}
