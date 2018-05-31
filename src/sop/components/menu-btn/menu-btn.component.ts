import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as csvtojson from 'csvtojson';
declare var $: any;
declare var M: any;

@Component({
  selector: 'menu-btn',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="fixed-action-btn">
  <a class="btn-floating btn-large red">
    <i class="large material-icons">mode_edit</i>
  </a>
  <ul>
  <li (click)="Menu('Image')"><a class="btn-floating purple tooltipped" data-position="top" data-tooltip="Add an image"><i class="material-icons">camera</i></a></li>
  <li (click)="Menu('Table')"><a class="btn-floating red tooltipped" data-position="top" data-tooltip="Add a table"><i class="material-icons">web</i></a></li>
    <li (click)="Menu('Description')"><a class="btn-floating yellow darken-1 tooltipped" data-position="top" data-tooltip="Add a description"><i class="material-icons">format_quote</i></a></li>
    <li (click)="Menu('List')"><a class="btn-floating green tooltipped" data-position="top" data-tooltip="Add a bullet list"><i class="material-icons">list</i></a></li>
    <li (click)="Menu('Attach')"><a class="btn-floating blue tooltipped" data-position="top" data-tooltip="Attach a webquoin code"><i class="material-icons">widgets</i></a></li>
    <li (click)="Menu('Note')"><a class="btn-floating orange tooltipped" data-position="top" data-tooltip="Add a note"><i class="material-icons">announcement</i></a></li>
  </ul>
</div>
`
})
export class MenuBtnComponent {
  @Output() menu = new EventEmitter<any>();

  constructor() {
    $(document).ready(function() {
      const options = {
        direction: 'left',
        hoverEnabled: true
      };
      $('.fixed-action-btn').floatingActionButton(options);
      $('.tooltipped').tooltip();
    });
  }

  Menu(kind) {
    this.menu.emit(kind);
  }
}
