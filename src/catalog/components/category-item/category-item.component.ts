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
    <tool-item  *ngIf="user"
        [category]="category" 
        [user]="user" 
        [userFavs]="userFavs"
        (add)="BookmarkIt($event)" 
        (remove)="UnbookmarkIt($event)" 
        (turnOn)="Active($event)" 
        (turnOff)="Unactive($event)"></tool-item>
    <a *ngIf="!category.cabinet; else cabinet" [routerLink]="['./category', category.title]">
        <div class="card-image waves-effect waves-block waves-light">
            <img class="image20 activator" src="{{category.image}}">
        </div>
        <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">{{category.title}}</span>
            <chip *ngFor="let chip of category.tags" [chip]="chip"></chip>
        </div>
    </a>

    <ng-template #cabinet>
        <a [routerLink]="['./cabinets', category.title]">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="image20 activator" src="{{category.image}}">
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">{{category.title}}</span>
                <chip *ngFor="let chip of category.tags" [chip]="chip"></chip>
            </div>
        </a>
    </ng-template>
    `,
  })
  export class CategoryItemComponent {
    @Input() category: any;
    @Input() user: any;
    @Input() userFavs: any;
    @Output() add = new EventEmitter<any>();
    @Output() remove = new EventEmitter<any>();
    @Output() turnOn = new EventEmitter<any>();
    @Output() turnOff = new EventEmitter<any>();

    BookmarkIt(event)   { this.add.emit(event); }
    UnbookmarkIt(event) { this.remove.emit(event); }
    Active(event)       { this.turnOn.emit(event); }
    Unactive(event)     { this.turnOff.emit(event); }
  }
