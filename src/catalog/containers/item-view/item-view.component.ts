import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { Catalog } from '../../models/catalog.model';
import { Category } from '../../models/category.model';
import { tap, filter, take } from 'rxjs/operators';

@Component({
  selector: 'category',
  // styleUrls: ['products.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section no-pad-bot" id="index-banner">
      <div class="card" id="top">
        <div class="container">
            <a [routerLink]="['../../']" class="right"><i class="small material-icons">arrow_back</i></a>
            <div id="topic"><h1 id="topic">{{ (cat$ | async)?.title }}</h1></div>
        </div>
      </div>
      <div class="row grid" id="catalog">
      <div *ngIf="!((category$ | async)?.length)">
        No items in category, add one to get started.
      </div>
      <category-view
        *ngFor="let category of (category$ | async)"
        [item]="category" class="card">
      </category-view>
      </div>
    </div>
  `,
})
export class ItemViewComponent implements OnInit {
  categories$: Observable<Catalog[]>;
  cat$: Observable<any>;
  category$: Observable<Category[]>;
  boo$: any;
  // /structure/cabinets/vanity channel cabinets

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.cat$ = this.store.select(fromStore.getSelectedCategory);
    this.cat$.subscribe(cat => {
      switch (cat.title) {
        case 'Base Cabinets': {
          this.boo$ = this.store.select(fromStore.getBaseCabLoaded);
          this.boo$.subscribe(boo => {
            if (!boo) {
              this.store.dispatch(new fromStore.LoadCabinetsBase());
            }
          });
          return this.category$ = this.store.select(fromStore.getBaseCab);
        }
      }
    });
  }
}
