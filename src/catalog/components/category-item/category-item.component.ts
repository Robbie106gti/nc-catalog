import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

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
        (turnOff)="Unactive($event)"
        (edit)="Edit($event)"></tool-item>
    <a *ngIf="!category.cabinet; else cabinet" [routerLink]="['./category', category.link]">
        <div class="card-image waves-effect waves-block waves-light">
            <img class="image20 activator" src="{{category.image}}">
        </div>
        <div class="card-content" >
            <span class="card-title activator grey-text text-darken-4">{{category.title}}</span>
            <chip *ngFor="let chip of category.tags" [chip]="chip"></chip>
        </div>
    </a>
    <div class="center red-text text-darken-4" *ngIf="category.active === false"><b>DISCONTINUED / INACTIVE!</b></div>

    <ng-template #cabinet>
        <a [routerLink]="['./cabinets', category.link]">
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
  styles: [
    `
      .card-image {
        background-color: white !important;
      }
    `
  ]
})
export class CategoryItemComponent {
  @Input()
  category: any;
  @Input()
  user: any;
  @Input()
  userFavs: any;
  @Output()
  add = new EventEmitter<any>();
  @Output()
  remove = new EventEmitter<any>();
  @Output()
  turnOn = new EventEmitter<any>();
  @Output()
  turnOff = new EventEmitter<any>();
  @Output()
  edit = new EventEmitter<any>();

  BookmarkIt(event) {
    this.add.emit(event);
  }
  UnbookmarkIt(event) {
    this.remove.emit(event);
  }
  Active(event) {
    this.turnOn.emit(event);
  }
  Unactive(event) {
    this.turnOff.emit(event);
  }
  Edit(e) {
    // console.log(e);
    this.edit.emit(e);
  }
}
