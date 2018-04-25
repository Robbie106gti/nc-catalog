import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

declare var $: any;
declare var Materialize: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'spec-form',
  templateUrl: './spec-form.component.html'
})
export class SpecFormComponent {
  @Input() iwhd: any;
  @Input() specs: any;
  @Input() content: any;
  @Input() results$: Observable<any>;
  @Output() search = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();

  cat: string;
  id: string; // tab id
  sId: string; // search id

  constructor() {
    $(document).ready(function() {
      $('select').material_select();
      $('.modal').modal({
        startingTop: '4%',
        endingTop: '10%'
      });
      $('ul.tabs').tabs();
    });
    this.id = 'main';
  }

  setId(id: string) {
    this.id = id;
  }

  Search(value: string, str: string, id: string) {
    if (value.length > 1) {
      this.cat = str;
      this.sId = id;
      this.search.emit({ category: str, value });
    }
  }

  Update(r) {
    if (!this.iwhd[this.sId] || !this.specs[this.sId]) {
      this.specs = { ...this.specs, [this.sId]: [] };
      this.iwhd = { ...this.iwhd, [this.sId]: [] };
    }
    if (r.sub === 'iwhd') {
      this.iwhd[this.sId].push(r);
    } else {
      this.specs[this.sId].push(r);
    }
    this.update.emit({ ...r, version: this.sId });
  }

  Remove(r) {
    if (r.sub === 'iwhd') {
      this.iwhd[this.sId] = this.iwhd[this.sId].filter(
        item => item.id !== r.id
      );
    } else {
      this.specs[this.sId] = this.specs[this.sId].filter(
        item => item.id !== r.id
      );
    }
    this.remove.emit({ ...r, toDo: 'remove', version: this.sId });
  }
  Close() {
    $('#modal1').modal('close');
  }
}
