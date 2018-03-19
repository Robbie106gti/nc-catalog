import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
declare var $: any;
declare var Materialize: any;

@Component({
selector: 'list-edit',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
<ul>
  <li class="padding right-align"><small><i>Add a item to the list</i></small><i class="material-icons right pointer" (click)="Add()">add</i></li>
  <li class="divider"></li>

  <li class="" *ngFor="let li of list">
    <i *ngIf="li.icon" class="material-icons">{{ li.icon }}</i>
    <i *ngIf="!li.icon" class="material-icons">label</i>
    <b>{{ li.title }} :</b>
    <span>{{ li.text }}</span>
    <span class="right">
      <i class="material-icons pointer" (click)="Edit(li)">edit</i>
      <i class="material-icons pointer" (click)="Remove(li)">remove_circle_outline</i>
    </span>
  </li>
</ul>

<div *ngIf="edit" class="card">
  <div class="input-field col s12">
    <input id="nameitem" [(ngModel)]="edit.title">
    <label for="nameitem">Title</label>
  </div>
  <div class="input-field col s12">
    <textarea id="textarea1" class="materialize-textarea" [(ngModel)]="edit.text"></textarea>
    <label for="textarea1">Textarea</label>
  </div>
  <div class="input-field col s8">
    <select>
      <option value="" disabled selected>Choose your option</option>
      <option *ngFor="let icon of icons" [value]="icon.icon">{{ icon.icon }} <i class="material-icons right">{{ icon.icon }}</i></option>
    </select>
    <label>Materialize Select</label>
  </div>
</div>
`,
})
export class ListEditComponent {
  @Input() list: any;
  @Input() icons: any;
  edit: any;

  constructor () {
    this.textfields();
  }

  Add() { this.list.push({ title: '', text: '' }); }
  Remove(li) { this.list = this.list.filter(item => item !== li); }
  Edit(li) {
    this.edit = li; console.log(this.edit);
    setTimeout(this.textfields(), 1000);
  }

  textfields() {
    $(document).ready(function() {
      Materialize.updateTextFields();
      $('#textarea1').trigger('autoresize');
      $('select').material_select();
    });
  }
}
