import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

declare var $: any;
declare var M: any;

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
  @Input() item: any;
  @Input() user: any;
  @Output() edited = new EventEmitter<any>();
  @Output() close = new EventEmitter<boolean>();
  constructor() {}

  Edited(e) {
    this.edited.emit(e);
  }
  Close() {
    console.log('close');
  }
  Name(e) {
    console.log(e);
  }
}
