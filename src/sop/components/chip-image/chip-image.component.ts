import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
selector: 'chip-image',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
<div class="chip col {{ size }}">
  <img [src]="url" [alt]="fileName">
  <i class="close material-icons teal-text text-darken-4">done</i> {{ fileName }}
</div>
`,
})
export class ChipImageComponent {
  @Input() size: any;
  @Input() url: string;
  @Input() fileName: string;
}
