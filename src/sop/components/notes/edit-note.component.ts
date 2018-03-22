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
  selector: 'edit-note',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div>
    <ul >
      <li class="padding right-align"><small><i>Add a note</i></small><i class="material-icons right pointer" (click)="Add()">add</i></li>
      <li class="divider"></li>
      <li *ngFor="let note of notes" class="limit">
        <i class="material-icons">announcement</i>
        <span class="right">
          <i class="material-icons pointer" (click)="Edit(note)">edit</i>
          <i class="material-icons pointer" (click)="Remove(note)">remove_circle_outline</i>
        </span>
        <b>{{note.title}}</b> {{note.content}}
      </li>
    </ul>
  </div>

  <div *ngIf="edit" class="card padding blue-grey lighten-4">
    <div class="row">
      <div class="input-field col s12">
        <input type="text" id="first_name2" [(ngModel)]="edit.title"  class="validate">
        <label for="first_name2">Title</label>
      </div>
      <div class="input-field col s12">
        <textarea id="textarea1" class="materialize-textarea validate" [(ngModel)]="edit.content"></textarea>
        <label for="textarea1">Content</label>
      </div>
      <div class="col s4">
        <button class="btn right" [disabled]="(!edit.title && !edit.content)"><i class="material-icons" (click)="New()">add</i></button>
      </div>
    </div>
  </div>
  `,
})
export class EditNoteComponent {
  @Input() notes: any;
  edit: any;
  @Output() newNotes = new EventEmitter<any>();

  constructor () {
    $(document).ready(function() {
      Materialize.textareaAutoResize($('#textarea1'));
    });
  }

  Add() {
    this.edit = new Object;
  }

  Edit (event) {
    this.edit = event;
    this.notes = this.notes.filter(item => item !== event);
    $(document).ready(function() {
      $('#textarea1').val(event.content);
      Materialize.textareaAutoResize($('#textarea1'));
    });
  }

  Remove (event) {
    this.notes = this.notes.filter(item => item !== event);
    this.newNotes.emit(this.notes);
  }

  New() {
    this.notes.push(this.edit);
    this.newNotes.emit(this.notes);
    this.edit = null;
  }
}
