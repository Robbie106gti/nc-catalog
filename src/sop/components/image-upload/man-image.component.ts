import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
selector: 'man-image',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
<div class="chip" *ngFor="let image of images">
  <img [src]="image.image" [alt]="image.title"> {{ image.title }}
  <i class="close material-icons teal-text text-darken-4 right">close</i>
</div>
`,
})
export class ManImageComponent {
  @Input() images: any;
}
