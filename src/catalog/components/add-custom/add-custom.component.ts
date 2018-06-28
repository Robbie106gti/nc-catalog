import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
declare var $: any;
declare var M: any;

@Component({
  selector: 'add-custom',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card padding unset" *ngIf="specials.addons['main'].length">
        <h4>Popular Attachments and Applications:</h4>
        <ul class="collapsible popout" data-collapsible="accordion">
            <li *ngFor="let addon of specials.addons['main']">
                <div class="collapsible-header"><i class="material-icons">{{ addon.icon }}</i>{{ addon.title }}</div>
                <div class="collapsible-body">
                    <span><b>{{ addon.title}}</b> {{ addon.content }}</span>
                </div>
            </li>
            <li *ngFor="let addon of specials.addons[v]">
                <div class="collapsible-header"><i class="material-icons">{{ addon.icon }}</i>{{ addon.title }}</div>
                <div class="collapsible-body">
                    <span><b>{{ addon.title}}</b> {{ addon.content }}</span>
                </div>
            </li>
            <li>
                <div class="collapsible-header"><i class="material-icons">import_contacts</i>Bottom cabinet - Application (example)</div>
                <div class="collapsible-body">
                    <span><b>Bottom cabinet</b> the recommended application for this panel is to apply it to the bottom of a cabinet</span>
                </div>
            </li>
        </ul>
   </div>
    `
})
export class AddCustomComponent {
  @Input() specials: any;
  @Input() v: any;

  constructor() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
  }
}
