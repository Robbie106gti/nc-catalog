import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
declare var $: any;
declare var Materialize: any;

@Component({
selector: 'man-image',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
<div class="chip" *ngFor="let image of images">
  <img [src]="image.image" [alt]="image.title"> {{ image.title }}
  <i class="close material-icons teal-text text-darken-4 right" (click)="Remove(image)">close</i>
</div>
`,
})
export class ManImageComponent {
  @Input() images: any;
  @Output() newImages = new EventEmitter<any>();

  Remove(i) {
    this.images = this.images.filter(item => item !== i);
    this.newImages.emit(this.images);
  }
}
