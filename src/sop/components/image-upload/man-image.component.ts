import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'man-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <ul>
  <li *ngFor="let image of images; let i = index"><list-reorder [i]="i" [list]="images" (reorderedList)="Reordered($event)"></list-reorder>
<div class="chip">
  <img [src]="image.image" [alt]="image.title"><span (click)="Renamed(i, image.title)"> {{ image.title }}</span>
  <i class="close material-icons teal-text text-darken-4 right" (click)="Remove(image)">close</i>
</div>
<input *ngIf="(index === i && rename)" type="text" class="validate" #cat [(ngModel)]="images[index].title" (blur)="Name()" (keyup.enter)="Name()">
</li>
</ul>

<ng-template #newtitle>
</ng-template>
`
})
export class ManImageComponent {
  @Input()
  images: any;
  @Output()
  newImages = new EventEmitter<any>();
  rename: boolean = false;
  index: number;

  Remove(i) {
    this.images = this.images.filter(item => item !== i);
    this.newImages.emit(this.images);
  }

  Renamed(i) {
    this.rename = true;
    this.index = i;
  }
  Name() {
    this.newImages.emit(this.images);
    this.rename = false;
  }

  Reordered(event) {
    this.images = event;
    this.newImages.emit(event);
  }
}
