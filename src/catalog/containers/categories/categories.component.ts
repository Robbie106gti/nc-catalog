import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import { Catalog } from '../../models/catalog.model';
import { User, Favorites, Notes } from '../../models/user.model';
import * as fromServices from '../../services';

@Component({
  selector: 'categories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <edit-cat *ngIf="e$ | async" [item]="item$ | async" (edit)="Edit($event)" (close)="Close($event)" (title)="TitleUpdate($event)"></edit-cat>
    <div class="section no-pad-bot no-pad-top" id="index-banner" *ngIf="(user$ | async) as user">
      <div class="row grid" id="catalog">
        <div *ngIf="!((categories$ | async)?.length)">
          No catagories, add one to get started.
        </div>
        <category-item
          *ngFor="let category of (categories$ | async)"
          [category]="category" [user]="user" [userFavs]="(userFavs$ | async)"
          class="card"
          [ngClass]="{'discontinued': category.active === false}"
          (add)="BookmarkIt($event)"
          (remove)="UnbookmarkIt($event)"
          (turnOn)="Active($event)"
          (turnOff)="Unactive($event)"
          (edit)="Edit($event)">          
        </category-item>
      </div>
    </div>
  `
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Catalog[]>;
  user$: Observable<User>;
  userFavs$: Observable<Favorites[]>;
  userNotes$: Observable<Notes[]>;
  item$: Observable<any>;
  e$: Observable<boolean>;

  constructor(private store: Store<fromStore.ProductsState>, private firestore: fromServices.FirestoreService) {}

  ngOnInit() {
    this.categories$ = this.store.select(fromStore.getCatalogBase);
    this.user$ = this.store.select(fromStore.getUserData);
    this.userFavs$ = this.store.select(fromStore.getUserFavs);
    this.userNotes$ = this.store.select(fromStore.getUserNotes);
    this.item$ = this.store.select(fromStore.getEditItem);
    this.e$ = this.store.select(fromStore.getEditLoaded);
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
    this.firestore.update(`categories/${event.cat.id}`, {
      active: true,
      updatedBy: event.user.fullName
    });
  }
  Unactive(event) {
    this.firestore.update(`categories/${event.cat.id}`, {
      active: false,
      updatedBy: event.user.fullName
    });
  }

  Edit(e) {
    // console.log(e);
    this.store.dispatch({ type: fromStore.LOAD_EDIT, payload: e });
  }

  Close(e) {
    // console.log(e);
    this.store.dispatch({ type: fromStore.EDITED });
  }

  TitleUpdate(e) {
    this.store.dispatch({ type: fromStore.UPDATE_TITLE, payload: e });
  }
}
