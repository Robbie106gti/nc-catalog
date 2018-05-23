import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { User, Favorites, Notes } from '../../models/user.model';
import * as fromServices from '../../services';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';

@Component({
  selector: 'category-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <tool-item  *ngIf="(user$ | async) as user"
        [category]="item"
        [user]="user"
        [userFavs]="(userFavs$ | async)"
        (add)="BookmarkIt($event)"
        (remove)="UnbookmarkIt($event)"
        (turnOn)="Active($event)"
        (turnOff)="Unactive($event)"></tool-item>
    <a [routerLink]="[item.link]">
        <div class="card-image waves-effect waves-block waves-light">
          <div class="bottom hide-on-med-and-down" *ngFor="let mat of item.materials">
          <div *ngFor="let mat of item.materials">
            <div class="mats p" *ngIf="mat === 'painted'"></div>
            <div class="mats w" *ngIf="mat === 'wood'"></div>
            <div class="mats en" *ngIf="mat === 'engineered'"></div>
            <div class="mats m" *ngIf="mat === 'melamine'"></div>
            <div class="mats eu" *ngIf="mat === 'euro materials'"></div>
            <div class="mats g" *ngIf="mat === 'gloss'"></div>
            <div class="mats me" *ngIf="mat === 'metal'"></div>
            </div>
          </div>
            <img class="image20 activator" src="{{ item.image }}">
        </div>
        <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">{{ item.title }}</span>
            <chip *ngFor="let chip of item.tags" [chip]="chip"></chip>
        </div>
    </a>
    `,
  styles: [
    `
    .bottom {
      bottom: 0;
      right: 0;
      position: absolute;
    }
    .mats {
      width: 1em;
      height: 1em;
      margin: 1px;
    }
    .mats.p {
      background-color: rgb(67, 200, 230);;
    }
    .mats.w {
      background-color: rgb(255, 249, 63);
    }
    .mats.en {
      background-color: rgb(255, 171, 64);
    }
    .mats.m {
      background-color: rgb(224, 41, 41);
    }
    .mats.eu {
      background-color: rgb(65, 187, 65);
    }
    .mats.g {
      background-color: rgb(36, 34, 175);
    }
    .mats.me {
      background-color: rgb(98, 137, 165);
    }
    `
  ]
})
export class CategoryViewComponent {
  user$: Observable<User>;
  userFavs$: Observable<Favorites[]>;
  @Input() item: any;
  @Output() add = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() turnOn = new EventEmitter<any>();
  @Output() turnOff = new EventEmitter<any>();

  constructor(private store: Store<fromStore.ProductsState>, private firestore: fromServices.FirestoreService) {
    this.user$ = this.store.select(fromStore.getUserData);
    this.userFavs$ = this.store.select(fromStore.getUserFavs);
  }

  BookmarkIt(event) {
    this.firestore.upsert(`users/${event.user.email}/favorites/${event.cat.id}`, {
      name: event.cat.title,
      id: event.cat.id
    });
  }
  UnbookmarkIt(event) {
    this.firestore.delete(`users/${event.user.email}/favorites/${event.cat.id}`);
  }
  Active(event) {
    this.firestore.update(`structure/${this.CatOrCab(event.cat)}/${event.cat.sub.toLowerCase()}/${event.cat.id}`, {
      active: true,
      updatedBy: event.user.fullName
    });
  }
  Unactive(event) {
    this.firestore.update(`structure/${this.CatOrCab(event.cat)}/${event.cat.sub.toLowerCase()}/${event.cat.id}`, {
      active: false,
      updatedBy: event.user.fullName
    });
  }
  CatOrCab(cat) {
    return cat.cabinet ? 'cabinets' : 'category';
  }
}
