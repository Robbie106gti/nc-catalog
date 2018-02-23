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
    <div class="card padding unset" *ngIf="addons.length">
        <h4>Addional Customizations:</h4>
        <ul class="collapsible popout" data-collapsible="accordion">
            <li *ngFor="let addon of addons">
                <div class="collapsible-header"><i class="material-icons">{{ addon.icon }}</i>{{ addon.title }}</div>
                <div class="collapsible-body">
                    <span><b>{{ addon.title}}</b> {{ addon.content }}</span>
                </div>
            </li>
        </ul>
   </div>
    `,
  })
  export class AddCustomComponent {
    @Input() addons: any;

    constructor () {
        $(document).ready(function(){
            $('.collapsible').collapsible();
          });
        }
  }
