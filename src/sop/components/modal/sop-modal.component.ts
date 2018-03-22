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
selector: 'sop-modal',
changeDetection: ChangeDetectionStrategy.OnPush,
templateUrl: './sop-modal.html',
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
export class SopModalComponent {
  @Input() modal: { title: string, action: string, sop?: any, edit?: any, newTitle?: string};
  @Input() user: string;
  @Input() url: string;
  @Input() pct: string;
  @Input() sop: any;
  @Input() icons: any;
  @Output() close = new EventEmitter<boolean>();
  @Output() add = new EventEmitter<any>();
  @Output() newList = new EventEmitter<any>();
  @Output() newTitle = new EventEmitter<any>();
  @Output() notes = new EventEmitter<any>();
  @Output() file = new EventEmitter<any>();

  // Add() { this.add.emit({ title: this.modal.title, fullName: this.user }); }
  Close() { this.close.emit(false); }
  Title(event) {
    this.modal.newTitle = event;
    if (this.modal.action === 'List') {
      this.newTitle.emit({ listTitle: event, fullName: this.user, sop: this.sop});
    }
  }
  Des(event) { this.modal.edit = event; }
  File(event) { this.file.emit({file: event, fullName: this.user }); }

  Add() { this.add.emit({ ...this.modal, fullName: this.user }); this.close.emit(false); }
  NewList(event) { this.newList.emit({ list: event, fullName: this.user, sop: this.sop }); }
  Notes(event) { this.notes.emit({ notes: event, fullName: this.user, sop: this.sop, action: 'Notes' }); }
}
