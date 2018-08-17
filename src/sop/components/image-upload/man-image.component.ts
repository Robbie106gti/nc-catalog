import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'man-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <ul>
  <li *ngFor="let image of images; let i = index; let first = first; let last = last"><list-reorder [i]="{index:i, first: first, last: last}" [list]="images" (reorderedList)="Reordered($event)"></list-reorder>
<div class="chip">
  <img [src]="image.image" [alt]="image.title"><span (click)="Renamed(i, image.title)"> {{ image.title }}</span>
  <i class="close material-icons teal-text text-darken-4 right" (click)="Remove(image)">close</i>
</div>
      <div class="ddIcon btn">
        <span>
          <i class="material-icons left">photo_size_select_large</i> {{ image.size || 'resize' | titlecase }}</span>
        <div class="ddIcon-content grey-text text-darken-3">
          <p *ngFor="let size of sizes" (click)="Size(size, i)">
            {{ size }}
          </p>
        </div>
      </div>
<input *ngIf="(index === i && rename)" type="text" class="validate" #cat [(ngModel)]="images[index].title" (blur)="Name()" (keyup.enter)="Name()">
</li>
</ul>

<ng-template #newtitle>
</ng-template>
`,
  styles: [
    `
      .ddIcon {
        position: relative;
        display: inline-block;
        min-width: 10em;
      }

      .ddIcon-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 20em;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        z-index: 999;
        margin-left: 8rem;
        margin-top: -8rem;
      }
      .ddIcon-content > p {
        padding-left: 1rem;
        margin-left: 1rem;
        text-align: left;
      }

      .ddIcon:hover .ddIcon-content {
        display: block;
      }

      .ddIcon-content > p:hover {
        background-color: #455a64;
        color: #fff;
      }
    `
  ]
})
export class ManImageComponent {
  @Input()
  images: any;
  @Output()
  newImages = new EventEmitter<any>();
  rename: boolean = false;
  index: number;
  sizes = ['default', 'small', 'medium', 'large'];

  Remove(i) {
    this.images = this.images.filter(item => item !== i);
    this.newImages.emit(this.images);
  }

  Size(size, i) {
    this.images[i].size = size;
    // console.log(size, i, this.images);
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
