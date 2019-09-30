import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import { Catalog } from '../../models/catalog.model';

@Component({
  selector: 'category',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<edit-cat *ngIf="e$ | async" [item]="item$ | async" (edit)="Edit($event)" (close)="Close($event)" (title)="TitleUpdate($event)"></edit-cat>
<div class="section no-pad-bot no-pad-top" id="index-banner" *ngIf="(cat$ | async) as cat">
  <div class="card" [ngClass]="{'discontinued': cat.active === false}" id="top">
    <div class="container">
      <a routerLink="/catalog" class="right no-print" queryParamsHandling="merge">
        <i class="small material-icons">arrow_back</i>
      </a>
      <div id="topic">
        <h1 id="topic">{{ cat.title }}</h1>
      </div>
      <div *ngIf="cat.title === 'Doors'" class="row">
        <door-filter (filter)="Filter($event)" [filtered]="filters$ | async"></door-filter>
      </div>
    </div>
  </div>
  <div class="row grid" id="catalog" *ngIf="cat.title !== 'Doors' && cat.title !== 'Materials and Finishes'">
    <div *ngIf="!((category$ | async)?.length)">
      No items in category, add one to get started.
    </div>
    <category-view *ngFor="let category of (category$ | async)" [item]="category" class="card" [ngClass]="{'discontinued': category.active === false}">
    </category-view>
  </div>
  <doors *ngIf="cat.title === 'Doors'"></doors>
  <materials *ngIf="cat.title === 'Materials and Finishes'"></materials>
</div>
  `
})
export class CatViewComponent implements OnInit {
  categories$: Observable<Catalog[]>;
  cat$: Observable<any>;
  category$: Observable<any[]>;
  filters$: Observable<any>;
  item$: Observable<any>;
  e$: Observable<boolean>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.cat$ = this.store.select(fromStore.getSelectedCategory);
    this.category$ = this.store.select(fromStore.getCategories);
    this.filters$ = this.store.select(fromStore.getFilterMaterials);
    this.item$ = this.store.select(fromStore.getEditItem);
    this.e$ = this.store.select(fromStore.getEditLoaded);
  }

  Filter(event) {
    let filtered = false;
    this.store.dispatch({ type: fromStore.FILTER, payload: filtered }); // makes sure the filter gets re-applied with multiple selections
    this.store.dispatch({ type: fromStore.FILTER_MAT, payload: event });
    Object.entries(event).map(([key, value]) => {
      if (value) return (filtered = true);
    });
    this.store.dispatch({ type: fromStore.FILTER, payload: filtered });
  }

  Edit(e) {
    // console.log(e);
    this.store.dispatch({ type: fromStore.LOAD_EDIT, payload: e });
  }

  TitleUpdate(e) {
    this.store.dispatch({ type: fromStore.UPDATE_TITLE, payload: e });
  }

  Close(e) {
    // console.log(e);
    this.store.dispatch({ type: fromStore.EDITED });
  }
}
