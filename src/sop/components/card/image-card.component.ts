import {
  Component,
  Input,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  QueryList
} from '@angular/core';

declare var M: any;

@Component({
  selector: 'image-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="card">
  <div class="card-image">
    <img #materialboxed [src]="card.image" [alt]="card.title" class="responsive-img materialboxed">
  </div>
  <div class="card-content">
    <span class="card-title">{{ card.title }}</span>
  </div>
</div>
`
})
export class ImageCardComponent implements AfterViewInit {
  @Input()
  card: any;
  @ViewChildren('materialboxed', { read: ElementRef })
  elemsMaterialboxed: QueryList<ElementRef>;

  constructor() {}

  ngAfterViewInit(): void {
    const elems = this.elemsMaterialboxed;
    elems.forEach(el => {
      const instanceMaterialboxed = new M.Materialbox(el.nativeElement, {});
    });
  }
}
