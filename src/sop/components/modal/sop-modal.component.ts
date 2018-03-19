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
  @Input() sop: any;
  @Input() icons: any;
  @Output() close = new EventEmitter<boolean>();
  @Output() add = new EventEmitter<any>();

  // Add() { this.add.emit({ title: this.modal.title, fullName: this.user }); }
  Close() { this.close.emit(false); }
  Title(event) { this.modal.newTitle = event; }
  Des(event) { this.modal.edit = event; }

  Add() { this.add.emit({ ...this.modal, fullName: this.user }); this.close.emit(false); }
}
