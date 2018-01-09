import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from '@angular/core';

  @Component({
    selector: 'category-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <a [routerLink]="['./category', category.id]">
        <div class="card-image waves-effect waves-block waves-light">
            <img class="image20 activator" src="{{category.image}}">
        </div>
        <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">{{category.title}}</span>
            <chip *ngFor="let chip of category.tags" [chip]="chip"></chip>
        </div>
    </a>
    `,
  })
  export class CategoryItemComponent {
    @Input() category: any;
  }
