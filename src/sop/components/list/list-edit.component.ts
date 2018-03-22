import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
declare var $: any;
declare var Materialize: any;

@Component({
selector: 'list-edit',
templateUrl: 'list-edit.html',
changeDetection: ChangeDetectionStrategy.OnPush,
styles: [`
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
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding-top:.5em;
  padding-bottom:.5em;
  z-index: 999;
  margin-left: 8rem;
  margin-top: -40rem;
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
`]
})
export class ListEditComponent {
  @Input() list: any;
  @Input() icons: any;
  @Output() newList = new EventEmitter<any>();
  edit: any;

  constructor () {
    this.textfields();
  }

  Add() {
    this.edit = new Object;
    setTimeout(this.textfields(), 1000);
  }
  Remove(li) { this.list = this.list.filter(item => item !== li); this.newList.emit(this.list); }
  Edit(li) {
    this.edit = li; console.log(this.edit);
    this.list = this.list.filter(item => item !== li);
    setTimeout(this.textfields(), 1000);
  }
  Icon(ic) { this.edit.icon = ic.icon; }
  New() {
    this.list.push(this.edit);
    this.newList.emit(this.list);
    this.edit = null;
  }

  textfields() {
    $(document).ready(function() {
      Materialize.updateTextFields();
      $('#textarea1').trigger('autoresize');
    });
  }
}
