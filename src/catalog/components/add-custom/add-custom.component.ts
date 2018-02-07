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
    // tslint:disable-next-line:component-selector
    selector: 'add-custom',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="card padding">
        <h4>Addional Customizations:</h4>
        <ul class="collapsible popout" data-collapsible="accordion">
            <li>
                <div class="collapsible-header"><i class="material-icons">extension</i>Reconfigures (CC-D6)</div>
                <div class="collapsible-body">
                    <span><b>Reconfigures (CC-D6)</b> any standard item. For example, a door/drawer setup.</span>
                </div>
            </li>
            <li>
                <div class="collapsible-header"><i class="material-icons">add_to_photos</i>Roll-out</div>
                <div class="collapsible-body"><span><b>Roll-out </b> Melamine Dado Joint MOVENTO Rollout shelves</span></div>
            </li>
        </ul>
   </div>
    `,
  })
  export class AddCustomComponent {
    @Input() content: any;

    constructor () {
        $(document).ready(function(){
            $('.collapsible').collapsible();
          });
        }
  }
