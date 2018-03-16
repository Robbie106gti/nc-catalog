import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
declare var $: any;
declare var Materialize: any;

@Component({
selector: 'menu-btn',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
<div class="fixed-action-btn horizontal">
  <a class="btn-floating btn-large red">
    <i class="large material-icons">add</i>
  </a>
  <ul>
    <li (click)="Menu('Image')"><a class="btn-floating red tooltipped" data-position="top" data-tooltip="Add a image"><i class="material-icons">camera</i></a></li>
    <li (click)="Menu('Description')"><a class="btn-floating yellow darken-1 tooltipped" data-position="top" data-tooltip="Add a description"><i class="material-icons">format_quote</i></a></li>
    <li (click)="Menu('List')"><a class="btn-floating green tooltipped" data-position="top" data-tooltip="Add a bullet list"><i class="material-icons">list</i></a></li>
    <li (click)="Menu('Attach')"><a class="btn-floating blue tooltipped" data-position="top" data-tooltip="Attach a webquoin code"><i class="material-icons">widgets</i></a></li>
    <li (click)="Menu('Note')"><a class="btn-floating orange tooltipped" data-position="top" data-tooltip="Add a note"><i class="material-icons">announcement</i></a></li>
  </ul>
</div>
`,
})
export class MenuBtnComponent {
  @Output() menu = new EventEmitter<any>();

  constructor() {
    $(document).ready(function(){
      $('.tooltipped').tooltip({delay: 50});
    });
  }

  Menu(kind) {
    this.menu.emit(kind);
  }
}
