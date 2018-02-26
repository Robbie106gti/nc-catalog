import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { Catalog } from '../../models/catalog.model';
import { User, Favorites, Notes } from '../../models/user.model';
import * as fromServices from '../../services';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'categories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <login-view></login-view>
    <div *ngIf="(user$ | async) as user"><span *ngIf="user.fullName">{{ user.fullName }}</span></div>
    <div class="section no-pad-bot" id="index-banner">
      <div class="row grid" id="catalog">
        <div *ngIf="!((categories$ | async)?.length)">
          No catagories, add one to get started.
        </div>
        <category-item
          *ngFor="let category of (categories$ | async)"
          [category]="category" [user]="(user$ | async)" [userFavs]="(userFavs$ | async)"
          class="card"
          (add)="BookmarkIt($event)"
          (remove)="UnbookmarkIt($event)"
          (turnOn)="Active($event)"
          (turnOff)="Unactive($event)">
        </category-item>
      </div>
    </div>
  `,
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Catalog[]>;
  user$: Observable<User>;
  userFavs$: Observable<Favorites[]>;
  userNotes$: Observable<Notes[]>;

  constructor(private store: Store<fromStore.ProductsState>, private firestore: fromServices.FirestoreService) {}

  ngOnInit() {
    this.categories$ = this.store.select(fromStore.getCatalogBase);
    this.user$ = this.store.select(fromStore.getUserData);
    this.userFavs$ = this.store.select(fromStore.getUserFavs);
    this.userNotes$ = this.store.select(fromStore.getUserNotes);
  }

  BookmarkIt(event)   {
    this.firestore.upsert(`users/${event.user.email}/favorites/${event.cat.id}`, { name: event.cat.title, id: event.cat.id });
  }
  UnbookmarkIt(event) { this.firestore.delete(`users/${event.user.email}/favorites/${event.cat.id}`); }
  Active(event)       { this.firestore.update(`categories/${event.cat.id}`, { active: true, updatedBy: event.user.fullName }); }
  Unactive(event)     { this.firestore.update(`categories/${event.cat.id}`, { active: false, updatedBy: event.user.fullName }); }
}
