import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
declare var M: any;
declare var $: any;

@Component({
  selector: 'door-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <ul class="collapsible z-depth-0 right">
    <li>
      <div class="collapsible-header">
        <i class="material-icons">filter_list</i>Filters</div>
      <div class="collapsible-body">
        <form action="#" class="row">
        <div class="col s8">
          <div *ngFor="let mat of materials">
            <label>
              <input type="checkbox" [checked]="filtered[mat]" (click)="Filter(mat)" />
              <span>{{ mat | titlecase }}</span>
            </label>
          </div>
          </div>
          <div class="col s4">
          <div>
            <label>
              <input type="checkbox" />
              <span>WR</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" />
              <span>1PC/2PC</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" />
              <span>5PC</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" />
              <span>RRP</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" />
              <span>Miter</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" />
              <span>M&T</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" />
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
export class DoorFilterComponent {
  @Output() filter = new EventEmitter<any>();
  materials: any;
  filtered: any;

  constructor() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
    this.materials = ['painted', 'wood', 'engineered', 'melamine', 'euro materials', 'gloss'];
    this.filtered = {
      painted: false,
      wood: false,
      engineered: false,
      melamine: false,
      'euro materials': false,
      gloss: false
    };
  }

  Filter(mat) {
    console.log(mat);
    !this.filtered[mat] ? (this.filtered[mat] = true) : (this.filtered[mat] = false);
    return this.filter.emit(this.filtered);
  }
}
