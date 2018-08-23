import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { User, Favorites } from '../../models/user.model';
import * as fromServices from '../../services';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import * as common from '../../utils/common';
declare var M: any;
declare var $: any;
@Component({
  selector: 'category-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<tool-item *ngIf="(user$ | async) as user" [category]="item" [user]="user" [userFavs]="(userFavs$ | async)" (add)="BookmarkIt($event)"
  (remove)="UnbookmarkIt($event)" (turnOn)="Active($event)" (turnOff)="Unactive($event)" (edit)="Edit($event)"></tool-item>
<a [routerLink]="[item.link]" [queryParams]="item.params" queryParamsHandling="merge">
  <div class="card-image waves-effect waves-block waves-light">
    <div class="bottom hide-on-med-and-down" *ngFor="let mat of item.materials">
      <div *ngFor="let mat of item.materials">
        <div class="mats p tooltipped" data-position="right" data-tooltip="Paint is available" *ngIf="mat === 'painted'"></div>
        <div class="mats w tooltipped" data-position="right" data-tooltip="Wood is available" *ngIf="mat === 'wood'"></div>
        <div class="mats en tooltipped" data-position="right" data-tooltip="Engineered is available" *ngIf="mat === 'engineered'"></div>
        <div class="mats m tooltipped" data-position="right" data-tooltip="Melanines are available" *ngIf="mat === 'melamine'"></div>
        <div class="mats eu tooltipped" data-position="right" data-tooltip="Euro Materials are available" *ngIf="mat === 'euro materials'"></div>
        <div class="mats g tooltipped" data-position="right" data-tooltip="Gloss is available" *ngIf="mat === 'gloss'"></div>
        <div class="mats me tooltipped" data-position="right" data-tooltip="Metal is available" *ngIf="mat === 'metal'"></div>
      </div>
    </div>
    <img class="image20 activator" src="{{ item.image }}">
  </div>
  <div class="card-content">
    <span class="card-title activator grey-text text-darken-4">{{ item.title }}</span>
    <chip *ngFor="let chip of item.tags" [chip]="chip"></chip>
  </div>
</a>
      <div class="center red-text text-darken-4" *ngIf="item.active === false">
        <b>DISCONTINUED / INACTIVE!</b>
      </div>
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
        background-color: rgb(67, 200, 230);
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
      .card-image {
        background-color: white !important;
      }
    `
  ]
})
export class CategoryViewComponent {
  user$: Observable<User>;
  userFavs$: Observable<Favorites[]>;
  @Input()
  item: any;
  @Output()
  add = new EventEmitter<any>();
  @Output()
  remove = new EventEmitter<any>();
  @Output()
  turnOn = new EventEmitter<any>();
  @Output()
  turnOff = new EventEmitter<any>();

  constructor(private store: Store<fromStore.ProductsState>, private firestore: fromServices.FirestoreService) {
    this.user$ = this.store.select(fromStore.getUserData);
    this.userFavs$ = this.store.select(fromStore.getUserFavs);
    $(document).ready(function() {
      $('.tooltipped').tooltip();
    });
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
    console.log(event);
    this.firestore.update(
      `structure/${this.CatOrCab(event.cat)}/${common.prepareFirestore(event.cat.sub.toLowerCase())}/${event.cat.id}`,
      {
        active: true,
        updatedBy: event.user.fullName
      }
    );
  }
  Unactive(event) {
    console.log(event);
    this.firestore.update(
      `structure/${this.CatOrCab(event.cat)}/${common.prepareFirestore(event.cat.sub.toLowerCase())}/${event.cat.id}`,
      {
        active: false,
        updatedBy: event.user.fullName
      }
    );
  }
  CatOrCab(cat) {
    return cat.cabinet ? 'cabinets' : 'category';
  }
  Edit(e) {
    this.store.dispatch({ type: fromStore.LOAD_EDIT, payload: e });
  }
}
