import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { TextfieldsUpdate } from '../../../app/shared/materialize/selectors';

@Component({
  selector: 'list-edit',
  templateUrl: 'list-edit.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .thumb {
        max-width: 3rem !important;
        max-height: 2.5rem !important;
        position: relative !important;
        top: -0.6rem !important;
        float: right;
      }
      .ddIcon {
        position: relative;
        display: inline-block;
        min-width: 10em;
      }

      .ddIcon-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 20em;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        z-index: 999;
        margin-left: 8rem;
      }
      .ddIcon-content > p {
        padding-left: 1rem;
        margin-left: 1rem;
        text-align: left;
      }

      .ddIcon:hover .ddIcon-content {
        display: block;
      }

      .ddIcon-content > p:hover {
        background-color: #455a64;
        color: #fff;
      }

      .mt1 {
        margin-top: -40rem;
      }

      .mt2 {
        margin-top: -4rem;
      }
      .thumb {
        max-height: 5rem;
        max-width: 8rem;
        position: absolute;
        left: 0;
        top: 0;
      }
      .collection {
        margin: 0 !important;
      }
    `
  ]
})
export class ListEditComponent implements AfterViewInit {
  @Input()
  list: any;
  @Input()
  icons: any;
  @Input()
  images: any;
  @Output()
  newList = new EventEmitter<any>();
  edit: any;
  id: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.textfields();
  }

  just() {
    console.log(this.images);
  }

  Add() {
    this.edit = new Object();
    setTimeout(this.textfields(), 1000);
  }

  Remove(li) {
    this.list = this.list.filter(item => item !== li);
    this.newList.emit(this.list);
  }

  Edit(li) {
    this.edit = li; 
      this.id = true;
    // console.log(this.edit);
    // this.list = this.list.filter(item => item !== li);
    setTimeout(this.textfields(), 1000);
  }

  Reordered(event) {
    this.list = event;
    this.newList.emit(event);
  }

  Icon(ic) {
    this.edit.icon = ic.icon;
  }

  Image(i) {
    this.edit.image = i;
  }

  New() {
    console.log(this.edit)

    this.id ? null : this.list.push(this.edit);
    this.id = false;
    this.newList.emit(this.list);
    this.edit = null;
  }

  textfields() {
    TextfieldsUpdate();
  }
}
