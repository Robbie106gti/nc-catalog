import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { Catalog } from '../../models/catalog.model';
import { Cabinets } from '../../models/cabinets.model';
import { tap, filter, take } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category',
  // styleUrls: ['products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section no-pad-bot" id="index-banner">
      <div class="card" id="top">
        <div class="container">
            <a routerLink="/catalog" class="right"><i class="small material-icons">arrow_back</i></a>
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
  category$: Observable<any[]>;

  constructor(private store: Store<fromStore.ProductsState>) { }

  ngOnInit() {
    this.cat$ = this.store.select(fromStore.getSelectedCategory);
    this.category$ = this.store.select(fromStore.getCabinets).take(1);
  }
}
