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
selector: 'modal',
changeDetection: ChangeDetectionStrategy.OnPush,
templateUrl: './modal.html',
styles: [`
.new {
  position: absolute;
  z-index: 999;
  margin-top: 12.5%;
  margin-left: 33%;
  width: 33%;
  padding-bottom: 4rem;
  padding-right: 1rem;
  padding-left: 1rem;
  padding-top: .2rem;
}
`]
})
export class ModalComponent {
  @Input() modal: { title: string, action: string, edit?: any };
  @Input() url: string;
  @Input() pct: string;
  @Input() user: string;
  @Output() close = new EventEmitter<boolean>();
  @Output() add = new EventEmitter<any>();
  @Output() edited = new EventEmitter<any>();
  @Output() file = new EventEmitter<any>();
  newCatagory: string;

  constructor() {
  $(document).ready(function(){
    $('.tooltipped').tooltip();
  });
  }
  File(event) { console.log(this.modal); this.file.emit({ edit: this.modal.edit, file: event, fullName: this.user }); }
  Add() { this.add.emit({ title: this.newCatagory, image: this.url, fullName: this.user }); }
  Edit() { this.edited.emit({ edit: this.modal.edit, fullName: this.user, titleNew: (this.newCatagory ? this.newCatagory : this.modal.edit.title), imageNew: this.url }); }
  Close() { this.close.emit(false); }
  Name(event) { this.newCatagory = event; }
  Remove() { this.edited.emit({ edit: this.modal.edit, fullName: this.user, remove: 'true' }); }
}
