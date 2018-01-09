import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from '@angular/core';

  @Component({
    selector: 'category-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <a [routerLink]="['./item', item.id]">
        <div class="card-image waves-effect waves-block waves-light">
            <img class="image20 activator" src="{{ item.image }}">
        </div>
        <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">{{ item.title }}</span>
            <chip *ngFor="let chip of item.tags" [chip]="chip"></chip>
        </div>
    </a>
    `,
  })
  export class CategoryViewComponent {
    @Input() item: any;
  }
