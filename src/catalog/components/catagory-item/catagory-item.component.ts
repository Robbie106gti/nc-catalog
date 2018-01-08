import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from '@angular/core';

  @Component({
    selector: 'catagory-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <a [routerLink]="['/catagory', catagory.id]">
        <div class="card-image waves-effect waves-block waves-light">
            <img class="image20 activator" src="{{catagory.image}}">
        </div>
        <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">{{catagory.title}}</span>
            <chip *ngFor="let chip of catagory.tags" [chip]="chip"></chip>
        </div>
    </a>
    `,
  })
  export class CatagoryItemComponent {
    @Input() catagory: any;

    constructor() {
        console.log(this.catagory);
    }
  }
