import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { Catalog } from '../../models/catalog.model';

@Component({
  selector: 'categories',
  // styleUrls: ['products.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <login-view></login-view>
    <div class="section no-pad-bot" id="index-banner">
      <div class="row grid" id="catalog">
        <div *ngIf="!((categories$ | async)?.length)">
          No catagories, add one to get started.
        </div>
        <category-item
          *ngFor="let category of (categories$ | async)"
          [category]="category" class="card">
        </category-item>
      </div>
    </div>
  `,
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Catalog[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.categories$ = this.store.select(fromStore.getCatalogBase);
  }
}
