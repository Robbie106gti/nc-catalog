import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
declare var M: any;
declare var $: any;

@Component({
  selector: 'door-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <ul class="tabs tabs-fixed-width tab-demo z-depth-1">
    <li class="tab col s3">
      <a class="brown-text" (click)="selStyle('slab')">Slab Face Doors</a>
    </li>
    <li class="tab col s3">
      <a class="brown-text" (click)="selStyle('recessed')">Recessed Panel Doors</a>
    </li>
    <li class="tab col s3">
      <a class="brown-text" (click)="selStyle('raised')">Raised Panel Doors</a>
    </li>
    <li class="tab col s3">
      <a class="brown-text" (click)="selStyle('metal')">Metal Doors</a>
    </li>
  </ul>`,
  styles: [
    `
  a.active {
    font-weight: 450 !important;
    background-color: #efebe9 !important;
  }
.tabs>li.indicator {
    height: 3px !important;
    background-color: #efebe9 !important;
}
    `
  ]
})
export class DoorMenuComponent {
  @Output() menu = new EventEmitter<any>();

  constructor() {
    $(document).ready(function() {
      $('.tabs').tabs();
    });
  }

  selStyle(style) {
    return this.menu.emit(style);
  }
}
