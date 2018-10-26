import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sop-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sop-modal.html',
  styles: [
    `
      .new {
        position: fixed;
        z-index: 999;
        top: 6%;
        left: 12.5%;
        width: 75%;
        padding-bottom: 2rem;
        padding-right: 1rem;
        padding-left: 1rem;
        padding-top: 0.2rem;
      }
      .heightmodal {
        max-height: 80vh;
        overflow-y: scroll;
        margin-bottom: 0px !important;
      }
    `
  ]
})
export class SopModalComponent {
  @Input()
  modal: { title: string; action: string; sop?: any; edit?: any; newTitle?: string };
  @Input()
  user: string;
  @Input()
  url: string;
  @Input()
  pct: string;
  @Input()
  sop: any;
  @Input()
  icons: any;
  @Output()
  close = new EventEmitter<boolean>();
  @Output()
  add = new EventEmitter<any>();
  @Output()
  newList = new EventEmitter<any>();
  @Output()
  newImages = new EventEmitter<any>();
  @Output()
  newTitle = new EventEmitter<any>();
  @Output()
  notes = new EventEmitter<any>();
  @Output()
  file = new EventEmitter<any>();
  @Output()
  table = new EventEmitter<any>();
  @Output()
  html = new EventEmitter<any>();
  @Output()
  mainImage = new EventEmitter<any>();

  titleImage: string;

  // Add() { this.add.emit({ title: this.modal.title, fullName: this.user }); }
  Close() {
    this.close.emit(false);
  }
  Title(event) {
    this.modal.newTitle = event;
    if (this.modal.action === 'List') {
      this.newTitle.emit({ listTitle: event, fullName: this.user, sop: this.sop });
    }
  }
  Des(event) {
    this.modal.edit = event;
    console.log(this.modal);
  }
  File(event) {
    this.file.emit({ file: event, fullName: this.user, dir: `/${this.sop.sub}/${this.sop.title}` });
  }

  Add() {
    this.add.emit({ ...this.modal, fullName: this.user });
    this.close.emit(false);
  }
  NewList(event) {
    this.newList.emit({ list: event, fullName: this.user, sop: this.sop });
  }
  NewImages(event) {
    this.newImages.emit({ images: event, fullName: this.user, sop: this.sop });
  }
  Notes(event) {
    this.notes.emit({ notes: event, fullName: this.user, sop: this.sop, action: 'Notes' });
  }
  AddImage() {
    if (this.titleImage) {
      const image = { title: this.titleImage, image: this.url };
      const images = this.sop.images;
      images.push(image);
      this.newImages.emit({ images, fullName: this.user, sop: this.sop });
    } else {
      alert('Please add a TITLE to the image.');
    }
  }
  TitleImage(event) {
    this.titleImage = event;
  }
  NewTable(event) {
    this.table.emit({ table: event, fullName: this.user, sop: this.sop });
  }
  ToHtml(event) {
    this.html.emit({ value: event, fullName: this.user, sop: this.sop, action: 'Html' });
  }

  MainImage() {
    if (this.sop.imageimportant === undefined) {
      this.sop.imageimportant = false;
    } else {
      this.sop.imageimportant = this.sop.imageimportant ? false : true;
    }
    console.log(this.sop.imageimportant);
    this.mainImage.emit({
      fullName: this.user,
      sop: this.sop,
      action: 'imageimportant',
      value: this.sop.imageimportant
    });
  }
}
