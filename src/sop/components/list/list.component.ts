import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
declare var $: any;
declare var Materialize: any;

@Component({
selector: 'list-card',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
<div class="card">
  <ul class="collection with-header">
    <li class="collection-header"><h4>{{ listTitle }}</h4></li>
    <li class="collection-item avatar" *ngFor="let li of list">
      <i *ngIf="li.icon" class="material-icons circle">{{li.icon}}</i>
      <i *ngIf="!li.icon" class="material-icons circle">label</i>
      <span class="title"><b>{{ li.title }}:</b></span>
      <p>{{ li.text }}</p>
    </li>
  </ul>
</div>
`,
styles: [`
.collection .collection-item:hover {
  background-color: #e0e0e0 !important;
}
`]
})
export class ListCardComponent {
  @Input() list: any;
  @Input() listTitle: string;

  constructor () {
  }
}
