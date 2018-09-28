import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
declare var M: any;

@Component({
  selector: 'edit-modal-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div id="modal1" class="modal bottom-sheet">
  <form *ngIf="edit">
    <div class="modal-content row">
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

<ng-template #inactive>
  <input type="checkbox">
</ng-template>
    `
})
export class EditModalBarComponent {
  @Input()
  edit: any;
  @Input()
  user: any;

  constructor() {}
}
