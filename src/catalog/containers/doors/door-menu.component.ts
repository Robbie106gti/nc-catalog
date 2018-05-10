import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
declare var M: any;
declare var $: any;

@Component({
  selector: 'door-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <ul class="tabs tabs-fixed-width tab-demo z-depth-1">
    <li class="tab col s3">
      <a (click)="selStyle('slab')">Slab Face Doors</a>
    </li>
    <li class="tab col s3">
      <a (click)="selStyle('recessed')">Recessed Panel Doors</a>
    </li>
    <li class="tab col s3">
      <a (click)="selStyle('raised')">Raised Panel Doors</a>
    </li>
    <li class="tab col s3">
      <a (click)="selStyle('metal')">Metal Doors</a>
    </li>
  </ul>`
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
