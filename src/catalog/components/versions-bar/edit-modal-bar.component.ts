import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from '@angular/core';
  declare var $: any;
  declare var Materialize: any;

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'edit-modal-bar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div id="modal1" class="modal bottom-sheet">
      <div class="modal-content">
        <h4>Modal Header</h4>
        <p>A bunch of text</p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
      </div>
    </div>
    `,
  })
  export class EditModalBarComponent {
    @Input() edit: any;
    @Input() user: any;

    constructor () {
        $(document).ready(function(){
          // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
          $('.modal').modal();
        });
        $('#modal1').modal('open');
        console.log('modal');
    }
  }
