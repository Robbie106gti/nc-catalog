import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewChildren,
  ElementRef,
  AfterViewInit,
  QueryList
} from '@angular/core';
declare var M: any;

@Component({
  selector: 'list-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="card">
  <ul class="collection with-header">
    <li class="collection-header"><h4>{{ listTitle }}</h4></li>
    <li class="collection-item avatar" [ngClass]="{ ' margin-image': li.image?.image }" *ngFor="let li of list">
      <i class="material-icons circle no-print">{{ li.icon || 'label' }}</i>
      <div class="secondary-content" *ngIf="li.image"><img #materialboxed class="responsive-img materialboxed" [src]="li.image.image" [alt]="li.image.title"/></div>
      <span class="title"><b>{{ li.title }}:</b></span>
      <p >{{ li.text }}</p>
    </li>
  </ul>
</div>
`,
  styles: [
    `
      .collection .collection-item:hover {
        background-color: #e0e0e0 !important;
      }
      .secondary-content {
        max-width: 8em;
        right: -8.2em !important;
        top: 0 !important;
      }
      .margin-image {
        margin-right: 8.2em;
      }
      img {
        border: 1px solid #949494;
      }
    `
  ]
})
export class ListCardComponent implements AfterViewInit {
  @Input()
  list: any;
  @Input()
  listTitle: string;
  @ViewChildren('materialboxed', { read: ElementRef })
  elemsMaterialboxed: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    const elems = this.elemsMaterialboxed;
    elems.forEach(el => {
      const instanceMaterialboxed = new M.Materialbox(el.nativeElement, {});
    });
  }
}
