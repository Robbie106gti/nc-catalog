import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
declare var $: any;
declare var Materialize: any;

@Component({
selector: 'list-edit',
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

<div *ngIf="edit" class="card padding deep-orange lighten-5">
  <div class="row">
    <div class="input-field col s12">
      <input id="nameitem" [(ngModel)]="edit.title">
      <label for="nameitem">Title</label>
    </div>
    <div class="input-field col s12">
      <textarea id="textarea1" class="materialize-textarea" [(ngModel)]="edit.text"></textarea>
      <label for="textarea1">Text</label>
    </div>
    <div class="input-field col s8">
      <select type="text" [(ngModel)]="iconNew">
        <option *ngFor="let i of icons" [ngValue]="i.icon">{{i.icon}}</option>
      </select>
      <label>Choose a icon</label>
    </div>
    <div class="col s4">
      <button class="btn right"><i class="material-icons" (click)="New(edit)">add</i></button>
    </div>
    <div class="col s12">{{ edit | json }} - {{ iconNew | json }}</div>
  </div>
</div>
`,
})
export class ListEditComponent {
  @Input() list: any;
  @Input() icons: any;
  edit: any;
  iconNew: any;

  constructor () {
    this.textfields();
  }

  Add() {
    this.edit = { title: '', text: '' };
    setTimeout(this.textfields(), 1000);
  }
  Remove(li) { this.list = this.list.filter(item => item !== li); }
  Edit(li) {
    this.edit = li; console.log(this.edit);
    this.list = this.list.filter(item => item !== li);
    setTimeout(this.textfields(), 1000);
  }
  Icon(icon) {
    console.log(icon);
    this.iconNew = icon;
  }
  New(li) {
    this.edit = { ...this.edit, icon: this.iconNew };
    console.log(this.edit);
    this.list.push(li);
  }

  textfields() {
    $(document).ready(function() {
      Materialize.updateTextFields();
      $('#textarea1').trigger('autoresize');
      $('select').material_select();
    });
  }
}
