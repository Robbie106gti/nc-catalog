import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edit-cat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-cat.html',
  styles: [
    `
      .new {
        position: absolute;
        z-index: 999;
        margin-top: 12.5%;
        margin-left: 33%;
        width: 33%;
        padding-bottom: 4rem;
        padding-right: 1rem;
        padding-left: 1rem;
        padding-top: 0.2rem;
      }
    `
  ]
})
export class EditCatComponent {
  @Input()
  item: any;
  @Input()
  user: any;
  @Output()
  edit = new EventEmitter<any>();
  @Output()
  close = new EventEmitter<boolean>();
  @Output()
  title = new EventEmitter<boolean>();
  constructor() {}

  Edit(e) {
    this.edit.emit(e);
  }
  Close() {
    this.close.emit(true);
  }
  Title(e) {
    this.item.title = e;
    this.title.emit(this.item);
  }
}
