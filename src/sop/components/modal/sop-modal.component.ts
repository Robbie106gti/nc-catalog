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
template: `
<!-- Modal Structure -->
<div class="card new">
  <div class="modal-content">
    <i (click)="Close()" class="material-icons left right pointer">close</i>
    <h4>{{ modal.title }}</h4>
    <hr>
    <div class="row">
      <input-title [title]="'Title ' + modal.action" [placeholder]="''" [size]="'s10'" (name)="Title($event)"></input-title>
    </div>
    <div class="row" *ngIf="modal.action === 'Description'">
      <des-textarea [title]="modal.action" [size]="'s8'" (des)="Des($event)"></des-textarea>
    </div>
  </div>
  <div class="modal-footer">
    <button class="waves-effect waves-green btn red right" (click)="Add()" [disabled]="!modal.edit"><i class="material-icons left">add</i>Add</button>
  </div>
</div>
`,
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
  @Input() modal: { title: string, action: string, edit?: any, newTitle?: string };
  @Input() user: string;
  @Output() close = new EventEmitter<boolean>();
  @Output() add = new EventEmitter<any>();

  // Add() { this.add.emit({ title: this.modal.title, fullName: this.user }); }
  Close() { this.close.emit(false); }
  Title(event) { this.modal.newTitle = event; }
  Des(event) { this.modal.edit = event; }

  Add() { this.add.emit({ ...this.modal, fullName: this.user }); this.close.emit(false); }
}
