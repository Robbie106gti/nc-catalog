import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChildren,
  ElementRef,
  QueryList,
  AfterViewInit
} from '@angular/core';
declare var M: any;

@Component({
  selector: 'menu-btn',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div #fabutton class="fixed-action-btn">
  <a class="btn-floating btn-large red" >
    <i class="large material-icons">mode_edit</i>
  </a>
  <ul>
  <li #tooltipped (click)="Menu('Image')"><a class="btn-floating purple tooltipped" data-position="top" data-tooltip="Add an image"><i class="material-icons">camera</i></a></li>
  <li #tooltipped (click)="Menu('Table')"><a class="btn-floating red tooltipped" data-position="top" data-tooltip="Add a table"><i class="material-icons">web</i></a></li>
    <li #tooltipped (click)="Menu('Description')"><a class="btn-floating yellow darken-1 tooltipped" data-position="top" data-tooltip="Add a description"><i class="material-icons">format_quote</i></a></li>
    <li #tooltipped (click)="Menu('List')"><a class="btn-floating green tooltipped" data-position="top" data-tooltip="Add a bullet list"><i class="material-icons">list</i></a></li>
    <li #tooltipped (click)="Menu('Attach')"><a class="btn-floating blue tooltipped" data-position="top" data-tooltip="Attach a webquoin code"><i class="material-icons">widgets</i></a></li>
    <li #tooltipped (click)="Menu('Note')"><a class="btn-floating orange tooltipped" data-position="top" data-tooltip="Add a note"><i class="material-icons">announcement</i></a></li>
    <li #tooltipped (click)="Menu('Html')"><a class="btn-floating purple tooltipped" data-position="top" data-tooltip="Html to sop"><i class="material-icons">developer_mode</i></a></li>
  </ul>
</div>
`
})
export class MenuBtnComponent implements AfterViewInit {
  @Output()
  menu = new EventEmitter<any>();

  @ViewChildren('fabutton', { read: ElementRef })
  fabuttons: QueryList<ElementRef>;
  instance: any;

  @ViewChildren('tooltipped', { read: ElementRef })
  tooltips: QueryList<ElementRef>;

  constructor() {}

  ngAfterViewInit(): void {
    console.log({ buttons: this.fabuttons, tips: this.tooltips });
    const fabutton = M.FloatingActionButton.init(this.fabuttons, { direction: 'left', hoverEnabled: true });
    const tooltips = M.Tooltip.init(this.tooltips, {});
    // M.AutoInit();
  }

  Menu(kind) {
    this.menu.emit(kind);
  }
}
