import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    ElementRef, ViewChild
  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
  declare var $: any;
  declare var Materialize: any;

  @Component({
    // tslint:disable-next-line:component-selector
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
    @Output() close = new EventEmitter<boolean>();
    @Output() file = new EventEmitter<any>();

    constructor (private fb: FormBuilder) {
        this.ToEdit();
        this.createForm();
    }

    createForm() {
      this.form = this.fb.group({
        name: ['', Validators.required],
        avatar: null
      });
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
          $(document).ready(function(){
              $('input.autocompleteSpec').autocomplete({
                  data: {
                    'Apple': null,
                    'Microsoft': null,
                    'Google': 'https://placehold.it/250x250'
                  },
                  limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                  onAutocomplete: function(val) {
                    // Callback function when value is autcompleted.
                    console.log(val);
                  },
                  minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
                });
                $('input.autocompleteNote').autocomplete({
                  data: {
                    'Apple': null,
                    'Microsoft': null,
                    'Google': 'https://placehold.it/250x250'
                  },
                  limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                  onAutocomplete: function(val) {
                    // Callback function when value is autcompleted.
                    console.log(val);
                  },
                  minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
                });
          });
    }

    onSubmit() {
        console.log('hello world');
    }

    Closed() { this.close.emit(true); $('#modal1').modal('close'); }

  }
