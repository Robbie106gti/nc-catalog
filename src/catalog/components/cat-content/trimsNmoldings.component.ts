import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  ElementRef,
  QueryList
} from '@angular/core';
declare var M: any;

@Component({
  selector: 'trimNmoldings-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="col s12 m6">
      <description-card [content]="content"></description-card>
      <div class="card-panel grey lighten-3">
        <span class="card-title"> <h4>Standards</h4> </span>
        <div class="divider"></div>
        <ul class="collection">
          <li class="collection-item" *ngFor="let standard of content.standards">
            {{ standard.title }}: {{ standard.content }}
          </li>
        </ul>
        <span class="card-title"> <h4>Options</h4> </span>
        <div class="divider"></div>
        <ul class="collection">
          <li class="collection-item" *ngFor="let option of content.options">
            {{ option.title }}: {{ option.content }}
            <a href="#!" class="secondary-content waves-effect waves-light btn">{{ option.option | titlecase }}</a>
          </li>
        </ul>
        <span class="card-title"> <h4>Restrictions</h4> </span>
        <div class="divider"></div>
        <ul class="collection">
          <li class="collection-item" *ngFor="let res of content.restrictions">{{ res.title }}: {{ res.content }}</li>
        </ul>
      </div>
    </div>

    <div class="col s12 m6">
      <div class="card">
        <div #slider class="carousel carousel-slider" data-indicators="true">
          <div class="carousel-item">
            <h2 class="padding">{{ content.title }}</h2>
            <img #materialboxed [src]="content.image" [alt]="content.title" class="responsive-img materialboxed" />
          </div>
        </div>
      </div>
    </div>
    <note-item class="col s12 m6" *ngFor="let note of content.notes" [uid]="note"></note-item>
  `
})
export class TrimMoldingContentComponent implements AfterViewInit {
  @Input()
  content: any;
  @Input()
  user: any;
  @ViewChild('slider', { read: ElementRef })
  slider: ElementRef;
  @ViewChildren('materialboxed', { read: ElementRef })
  elemsMaterialboxed: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    M.Carousel.init(this.slider.nativeElement, {});
    this.elemsMaterialboxed.forEach(el => {
      const instanceMaterialboxed = new M.Materialbox(el.nativeElement, {});
    });
  }
}
