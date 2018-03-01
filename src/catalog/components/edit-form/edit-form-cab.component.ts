import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy
  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

  declare var $: any;
  declare var Materialize: any;

  @Component({
    selector: 'edit-form-cab',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './edit-form-cab.component.html',
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

    constructor (private fb: FormBuilder) {
        this.ToEdit();
        this.createForm();
        $(document).ready(function(){
          $('ul.tabs').tabs();
        });
    }

    createForm() {
      this.form = this.fb.group({
        description: [''],
        spec: [''],
        note: [''],
        specV: [''],
        noteV: [''],
      });
    }

    Search(value: string, str: string) {
      if (value.length > 1) {
        this.search.emit({ category: str, value: value });
      }
    }

    imageUpload(event) {
     this.file.emit(event);
    }

    ToEdit() {
        $(document).ready(function(){
            // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
            $('.modal').modal({dismissible: false });
            $('#modal1').modal('open');
          });
    }

    onDes(event) {
      const up = { sub: 'Description', value: this.form.controls.description.value, version: 'item' };
      this.update.emit({ ...up });
    }

    onAddon(event) {
      const up = { sub: 'Addons', value: this.form.controls.spec.value, version: 'item' };
      this.update.emit({ update: up });
    }

    onNote(event) {
      const up = { sub: 'Notes', value: this.form.controls.note.value, version: 'item' };
      this.update.emit({ update: up });
    }

    onAddonV(event, id) {
      const up = { sub: 'Addons', value: this.form.controls.spec.value, version: 'version', id };
      this.update.emit({ update: up });
    }

    onNoteV(event, id) {
      const up = { sub: 'Notes', value: this.form.controls.note.value, version: 'version', id };
      this.update.emit({ update: up });
    }

    Closed() { this.close.emit(true); $('#modal1').modal('close'); }

    OffOn(event) { this.update.emit({ ...event, sub: 'OnOff' }); }

  }
