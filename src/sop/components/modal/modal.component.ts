import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { Tooltips, TextfieldsUpdate } from '../../../app/shared/materialize/selectors';

@Component({
  selector: 'modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal.html',
  styles: [
    `
      .new {
        position: fixed;
        z-index: 5;
        margin-top: 5%;
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
export class ModalComponent implements AfterViewInit {
  @Input()
  modal: { title: string; action: string; edit?: any };
  @Input()
  url: string;
  @Input()
  pct: string;
  @Input()
  user: string;
  @Output()
  close = new EventEmitter<boolean>();
  @Output()
  add = new EventEmitter<any>();
  @Output()
  edited = new EventEmitter<any>();
  @Output()
  file = new EventEmitter<any>();
  newCatagory: string;

  constructor() {}

  ngAfterViewInit(): void {
    Tooltips();
    TextfieldsUpdate();
  }

  File(event) {
    // console.log(this.modal);
    this.file.emit({ edit: this.modal.edit, file: event, fullName: this.user });
  }
  Add() {
    this.add.emit({ title: this.newCatagory, image: this.url, fullName: this.user });
  }
  Edit() {
    this.edited.emit({
      edit: this.modal.edit,
      fullName: this.user,
      titleNew: this.newCatagory ? this.newCatagory : this.modal.edit.title,
      imageNew: this.url
    });
  }
  Close() {
    this.close.emit(false);
  }
  Name(event) {
    this.newCatagory = event;
  }
  Remove() {
    this.edited.emit({ edit: this.modal.edit, fullName: this.user, remove: 'true' });
  }
}
