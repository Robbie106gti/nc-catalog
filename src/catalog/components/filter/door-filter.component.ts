import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  QueryList
} from '@angular/core';
declare var M: any;

@Component({
  selector: 'door-filter',
  template: `
  <ul #collapsible class="collapsible z-depth-0 right">
    <li>
      <div class="collapsible-header">
        <i class="material-icons">filter_list</i>Filters</div>
      <div class="collapsible-body">
        <form action="#" class="row">
        <div class="col s8">
          <div>
            <label>
              <input type="checkbox" [checked]="filtered['painted']" (click)="Filter('painted')" />
              <span>Painted</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" [checked]="filtered['wood']" (click)="Filter('wood')" />
              <span>Wood</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" [checked]="filtered['engineered']" (click)="Filter('engineered')" />
              <span>Engineered</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" [checked]="filtered['melamine']" (click)="Filter('melamine')" />
              <span>Melamine</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" [checked]="filtered['euro materials']" (click)="Filter('euro materials')" />
              <span>Euro Materials</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" [checked]="filtered['gloss']" (click)="Filter('gloss')" />
              <span>Gloss</span>
            </label>
          </div>
          </div>
          <div class="col s4">
          <div>
            <label>
              <input type="checkbox"  [checked]="filtered['wr']" (click)="Filter('wr')"/>
              <span>WR</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox"  [checked]="filtered['1pc']" (click)="Filter('1pc')"/>
              <span>1PC/2PC</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox"  [checked]="filtered['5pc']" (click)="Filter('5pc')"/>
              <span>5PC</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox"  [checked]="filtered['rrp']" (click)="Filter('rrp')"/>
              <span>RRP</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox"  [checked]="filtered['miter']" (click)="Filter('miter')"/>
              <span>Miter</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox"  [checked]="filtered['m&t']" (click)="Filter('m&t')"/>
              <span>M&T</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox"  [checked]="filtered['routered']" (click)="Filter('routered')"/>
              <span>Routered</span>
            </label>
          </div>
          </div>
        </form>
      </div>
    </li>
  </ul>`,
  styles: [
    `
      .collapsible {
        border: none !important;
        margin: 0px;
      }
      .collapsible-header {
        margin-top: -1rem !important;
        padding-top: 0 !important;
        padding-bottom: 0.2rem !important;
      }
      .collapsible-body {
        padding: 0.5rem;
      }
    `
  ]
})
export class DoorFilterComponent implements AfterViewInit {
  @Output()
  filter = new EventEmitter<any>();
  @Input()
  filtered: any;
  @ViewChildren('collapsible', { read: ElementRef })
  elemsCollapsible: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.elemsCollapsible.forEach(el => new M.Collapsible(el.nativeElement, {}));
  }

  Filter(mat) {
    // console.log(mat);
    this.filtered[mat] === false ? (this.filtered[mat] = true) : (this.filtered[mat] = false);
    return this.filter.emit(this.filtered);
  }
}
