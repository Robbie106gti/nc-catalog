import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ActionMenu, Tooltips } from '../../../app/shared/materialize/selectors';

declare var M: any;

@Component({
  selector: 'menu-btn',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div #actionmenu class="fixed-action-btn">
  <a class="btn-floating btn-large red" >
    <i class="large material-icons">mode_edit</i>
  </a>
  <ul>
  <li (click)="Menu('Image')"><a class="btn-floating purple tooltipped" #tooltipped data-position="top" data-tooltip="Add an image"><i class="material-icons">camera</i></a></li>
  <li (click)="Menu('Table')"><a class="btn-floating red tooltipped" #tooltipped data-position="top" data-tooltip="Add a table"><i class="material-icons">web</i></a></li>
    <li (click)="Menu('Description')"><a class="btn-floating yellow darken-1 tooltipped" #tooltipped data-position="top" data-tooltip="Add a description"><i class="material-icons">format_quote</i></a></li>
    <li (click)="Menu('List')"><a class="btn-floating green tooltipped" #tooltipped data-position="top" data-tooltip="Add a bullet list"><i class="material-icons">list</i></a></li>
    <li (click)="Menu('Attach')"><a class="btn-floating blue tooltipped" #tooltipped data-position="top" data-tooltip="Attach a webquoin code"><i class="material-icons">widgets</i></a></li>
    <li (click)="Menu('Note')"><a class="btn-floating orange tooltipped" #tooltipped data-position="top" data-tooltip="Add a note"><i class="material-icons">announcement</i></a></li>
    <li (click)="Menu('Html')"><a class="btn-floating purple tooltipped" #tooltipped data-position="top" data-tooltip="Html to sop"><i class="material-icons">developer_mode</i></a></li>
  </ul>
</div>
`
})
export class MenuBtnComponent implements AfterViewInit {
  @Output()
  menu = new EventEmitter<any>();
  @ViewChild('actionmenu', { read: ElementRef })
  actionmenu: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    const menu = M.FloatingActionButton.init(this.actionmenu.nativeElement, {
      direction: 'left',
      hoverEnabled: false
    });
    setTimeout(() => {
      const hello = Tooltips();
    }, 1000);
  }

  Menu(kind) {
    this.menu.emit(kind);
  }
}
