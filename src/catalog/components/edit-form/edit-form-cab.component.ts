import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

declare var $: any;
declare var M: any;

@Component({
  selector: 'edit-form-cab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-form-cab.component.html',
  styles: [
    `
      .modal.bottom-sheet {
        height: 87%;
        max-height: 87%;
      }
    `
  ]
})
export class EditFormCabComponent {
  form: FormGroup;
  @Input() content: any;
  @Input() user: any;
  @Input() pct: number;
  @Input() pctfile: string;
  @Input() url: string;
  @Input() results$: Observable<any>;
  @Input() specials: any;

  @Output() close = new EventEmitter<boolean>();
  @Output() file = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();

  cat: string;
  version: string;

  constructor(private fb: FormBuilder) {
    this.ToEdit();
    this.createForm();
    $(document).ready(function() {
      $('ul.tabs').tabs();
    });
    this.version = 'main';
  }

  setId(id) {
    this.version = id;
  }

  setItem(item) {
    this.cat = item;
  }

  createForm() {
    this.form = this.fb.group({
      description: [''],
      spec: [''],
      note: [''],
      specV: [''],
      noteV: ['']
    });
  }

  Search(value: string) {
    if (value.length > 1) {
      this.search.emit({ category: this.cat, value });
      console.log(this.cat, value);
    }
  }

  imageUpload(event) {
    this.file.emit({ ...event, version: this.version });
  }

  ToEdit() {
    $(document).ready(function() {
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('.modal').modal({ dismissible: false });
      $('#modal1').modal('open');
    });
  }

  onDes(event) {
    const up = {
      sub: 'Description',
      value: this.form.controls.description.value,
      version: 'item'
    };
    this.update.emit({ ...up });
  }

  Add(event, version) {
    console.log({ sub: this.cat, value: event, version });
    // this.update.emit({ sub: this.cat, value: event, version });
  }

  Remove(r) {
    if (r.sub === 'iwhd') {
      this.specials.iwhd[this.version] = this.specials.iwhd[this.version].filter(item => item.id !== r.id);
    } else {
      this.specials.specs[this.version] = this.specials.specs[this.version].filter(item => item.id !== r.id);
    }
    this.remove.emit({ ...r, toDo: 'remove', version: this.version });
  }

  Closed() {
    this.close.emit(true);
    $('#modal1').modal('close');
  }

  OffOn(event) {
    this.update.emit({ ...event, sub: 'OnOff' });
  }
}
