import {
  Component,
  Input,
  ChangeDetectionStrategy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList
} from '@angular/core';
declare var M: any;

@Component({
  selector: 'slider-images',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="card large" *ngIf="param.Version; else cover">
  <div #slider class="carousel carousel-slider" data-indicators="true">
    <div class="carousel-item">
      <h2 class="padding">Spec {{ content.title}} {{ content.versions[param.Version].title }}</h2>
      <span *ngIf="content.versions[param.Version].images; else icon">
        <img #materialboxed [src]="content.versions[param.Version].images.spec.image" [alt]="content.versions[param.Version].images.spec.image"
          class="responsive-img materialboxed">
      </span>
    </div>
    <div class="carousel-item">
      <h2 class="padding">{{ content.title}} {{ content.versions[param.Version].title }}</h2>
      <span *ngIf="content.versions[param.Version].images; else icon">
        <img #materialboxed [src]="content.versions[param.Version].images.image.image" [alt]="content.versions[param.Version].images.image.image"
          class="responsive-img materialboxed">
      </span>
    </div>
  </div>
</div>

<ng-template #cover>
  <div class="card">
    <div #slider class="carousel carousel-slider" data-indicators="true">
      <div class="carousel-item">
        <h2 class="padding">{{ content.title }}</h2>
        <img #materialboxed [src]="content.image" [alt]="content.title" class="responsive-img materialboxed">
      </div>
    </div>
  </div>
</ng-template>

<ng-template #icon>
  <i class="material-icons large">image</i>
</ng-template>
    `,
  styles: [
    `
      .carousel .indicators .indicator-item {
        background-color: #444 !important;
        color: #444 !important;
      }
    `
  ]
})
export class SliderImagesComponent implements AfterViewInit {
  @Input()
  content: any;
  @Input()
  param: any;
  @ViewChild('slider', { read: ElementRef })
  slider: ElementRef;
  @ViewChildren('materialboxed', { read: ElementRef })
  elemsMaterialboxed: QueryList<ElementRef>;

  constructor() { }
  ngAfterViewInit(): void {
    M.Carousel.init(this.slider.nativeElement, {});
    this.elemsMaterialboxed.forEach(el => {
      const instanceMaterialboxed = new M.Materialbox(el.nativeElement, {});
    });
  }
}
