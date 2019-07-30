import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

declare var M: any;

@Component({
  selector: 'menu-btn',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #actionmenu class="fixed-action-btn">
      <a class="btn-floating btn-large red tooltipped" #tooltipped data-position="top" data-tooltip="Edit this SOP">
        <i class="large material-icons">mode_edit</i>
      </a>
      <ul>
        <li (click)="Menu('Image')" class="tooltipped" #tooltipped data-position="top" data-tooltip="Add/Edit an image">
          <a class="btn-floating purple"
            ><i class="material-icons">camera</i></a
          >
        </li>
        <li (click)="Menu('Table')" class="tooltipped" #tooltipped data-position="top" data-tooltip="Add/Edit a table">
          <a class="btn-floating red"
            ><i class="material-icons">web</i></a
          >
        </li>
        <li (click)="Menu('Description')" class="tooltipped" #tooltipped data-position="top" data-tooltip="Add/Edit a description">
          <a
            class="btn-floating yellow darken-1"
            ><i class="material-icons">format_quote</i></a
          >
        </li>
        <li (click)="Menu('List')" class="tooltipped" #tooltipped data-position="top" data-tooltip="Add/Edit a bullet list">
          <a class="btn-floating green"
            ><i class="material-icons">list</i></a
          >
        </li>
        <li (click)="Menu('Attach')" class="tooltipped" #tooltipped data-position="top" data-tooltip="Attach/Update a webquoin code">
          <a class="btn-floating blue" disabled
            ><i class="material-icons">widgets</i></a
          >
        </li>
        <li (click)="Menu('Note')" class="tooltipped" #tooltipped data-position="top" data-tooltip="Add/Edit a note">
          <a class="btn-floating orange"
            ><i class="material-icons">announcement</i></a
          >
        </li>
        <li (click)="Menu('Html')" class="tooltipped" #tooltipped data-position="top" data-tooltip="Insert HTML code into sop">
          <a class="btn-floating purple" disabled
            ><i class="material-icons">developer_mode</i></a
          >
        </li>
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
    M.FloatingActionButton.init(this.actionmenu.nativeElement, {
      direction: 'left',
      hoverEnabled: false
    });
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
  }

  Menu(kind) {
    this.menu.emit(kind);
  }
}
