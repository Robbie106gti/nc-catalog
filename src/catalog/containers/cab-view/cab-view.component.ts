import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'category',
  // styleUrls: ['products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section no-pad-bot" id="index-banner">
      <div class="card" id="top">
        <div class="container" *ngIf="(cat$ | async) as cat">
            <a routerLink="/catalog" class="right"><i class="small material-icons">arrow_back</i></a>
            <div id="topic"><h1 id="topic">{{ cat.title }}</h1></div>
            <span class="right"><i><small>Updated by:{{ cat.updatedBy }} - on: {{ cat.updatedAt }}</small></i></span><br>
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
  `
})
export class CabViewComponent implements OnInit {
  cat$: Observable<any>;
  category$: Observable<any[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.cat$ = this.store.select(fromStore.getSelectedCategory).take(1);
    this.category$ = this.store.select(fromStore.getCabinets).take(1);
  }
}
