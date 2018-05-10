import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

declare var $: any;
declare var M: any;

@Component({
  selector: 'edit-form-cab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-form-cab.component.html'
})
export class EditFormCabComponent {
  form: FormGroup;
  @Input() edit: any;
  @Input() user: any;
  @Input() pct: number;
  @Input() pctfile: string;
  @Input() url: string;
  @Input() results$: Observable<any>;

  @Output() close = new EventEmitter<boolean>();
  @Output() file = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();

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

  createForm() {
    this.form = this.fb.group({
      description: [''],
      spec: [''],
      note: [''],
      specV: [''],
      noteV: ['']
    });
  }

  Search(value: string, str: string) {
    if (value.length > 1) {
      this.cat = str;
      this.search.emit({ category: str, value });
      console.log(str, value);
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
    this.update.emit({ sub: this.cat, value: event, version });
  }

  Closed() {
    this.close.emit(true);
    $('#modal1').modal('close');
  }

  OffOn(event) {
    this.update.emit({ ...event, sub: 'OnOff' });
  }
}
