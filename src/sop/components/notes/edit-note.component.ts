import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
declare var M: any;

@Component({
  selector: 'edit-note',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div>
    <ul >
      <li class="padding right-align"><small><i>Add a note</i></small><i class="material-icons right pointer" (click)="Add()">add</i></li>
      <li class="divider"></li>
      <li class="padding"></li>
      <li class="limit" *ngFor="let note of notes; let i = index; let first = first; let last = last"><list-reorder [i]="{index:i, first: first, last: last}"(reorderedList)="Reordered($event)" [list]="notes"></list-reorder>
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
  `
})
export class EditNoteComponent implements AfterViewInit {
  @Input()
  notes: any;
  edit: any;
  @Output()
  newNotes = new EventEmitter<any>();

  constructor() {}

  ngAfterViewInit(): void {
    M.updateTextFields();
  }

  Add() {
    this.edit = new Object();
  }

  Edit(event) {
    this.edit = event;
    this.notes = this.notes.filter(item => item !== event);
    M.updateTextFields();
  }

  Reordered(event) {
    this.notes = event;
    this.newNotes.emit(event);
  }

  Remove(event) {
    this.notes = this.notes.filter(item => item !== event);
    this.newNotes.emit(this.notes);
  }

  New() {
    this.notes.push(this.edit);
    this.newNotes.emit(this.notes);
    this.edit = null;
  }
}
