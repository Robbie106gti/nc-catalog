import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
  declare var $: any;
  declare var Materialize: any;

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'edit-form-cab',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div id="modal1" class="modal bottom-sheet" >
        <form *ngIf="edit">
            <div class="modal-content row"><i class="material-icons tool-item medium" (click)="Closed()">close</i>
                <h4>Update {{edit.content.title}}
                    <div class="switch">
                        <label>
                            Off
                            <input type="checkbox" *ngIf="edit.content.active; else inactive" checked>
                            <span class="lever"></span>
                            On
                        </label>
                    </div>
                </h4>
                <div class="col s6 m6">
                    <div class="file-field input-field">
                        <div class="btn">
                            <span>Image</span>
                            <input type="file">
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" placeholder="Upload a image for {{ edit.content.title }}">
                        </div>
                    </div>
                    <div class="input-field col s12">
                        <textarea id="description" class="materialize-textarea"></textarea>
                        <label for="description">Description</label>
                    </div>
                </div>
                <div class="col s6 m6 input-field">
                    <i class="material-icons prefix">textsms</i>
                    <input type="text" id="autocomplete-specg" class="autocompleteSpec">
                    <label for="autocomplete-specg">Specifications</label>
                </div>
                <div class="col s6 m6 input-field">
                    <i class="material-icons prefix">textsms</i>
                    <input type="text" id="autocomplete-noteg" class="autocompleteNote">
                    <label for="autocomplete-noteg">Notes</label>
                </div>
            </div>
            <div class="modal-content row">
                <h4>Update {{edit.content.title}} {{ edit.version.height }}{{ edit.version.version || '" high'}}
                    <div class="switch">
                        <label>
                            Off
                            <input type="checkbox" *ngIf="edit.version.active; else inactive" checked>
                            <span class="lever"></span>
                            On
                        </label>
                    </div>
                </h4>
                <div class="col s6 m6">
                    <div class="file-field input-field">
                        <div class="btn">
                            <span>Image</span>
                            <input type="file">
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" placeholder="Upload a image for {{ edit.version.height }}">
                        </div>
                    </div>
                    <div class="file-field input-field">
                        <div class="btn">
                            <span>Spec</span>
                            <input type="file">
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" placeholder="Upload a spec image for {{ edit.version.height }}">
                        </div>
                    </div>
                </div>
                <div class="col s6 m6 input-field">
                    <i class="material-icons prefix">textsms</i>
                    <input type="text" id="autocomplete-spec" class="autocompleteSpec">
                    <label for="autocomplete-spec">Specifications</label>
                </div>
                <div class="col s6 m6 input-field">
                    <i class="material-icons prefix">textsms</i>
                    <input type="text" id="autocomplete-note" class="autocompleteNote">
                    <label for="autocomplete-note">Notes</label>
                </div>
            </div>
        </form>
    </div>

    <ng-template #inactive><input type="checkbox"></ng-template>
    `,
  })
  export class EditFormCabComponent {
    @Input() edit: any;
    @Input() user: any;
    @Output() close = new EventEmitter<boolean>();

    constructor () {
        this.ToEdit();
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

    Closed() { this.close.emit(true); $('#modal1').modal('close'); }

  }
