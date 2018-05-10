import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { Catalog } from '../../models/catalog.model';
import { tap, filter, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'category',
  // styleUrls: ['products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section no-pad-bot no-pad-top" id="index-banner" *ngIf="(cat$ | async) as cat">
      <div class="card" id="top">
        <div class="container">
            <a routerLink="/catalog" class="right no-print"><i class="small material-icons">arrow_back</i></a>
            <div id="topic"><h1 id="topic">{{ cat.title }}</h1></div>
            <div *ngIf="cat.title === 'Doors'" class="row">
              <door-filter (filter)="Filter($event)"></door-filter>
            </div>
        </div>
      </div>
      <div class="row grid" id="catalog" *ngIf="cat.title !== 'Doors'; else Doors">
        <div *ngIf="!((category$ | async)?.length)">
          No items in category, add one to get started.
        </div>
        <category-view
          *ngFor="let category of (category$ | async)"
          [item]="category" class="card">
        </category-view>
      </div>
    </div>

    <ng-template #Doors>
      <doors [filtered]="filtered"></doors>
    </ng-template>
  `
})
export class CatViewComponent implements OnInit {
  categories$: Observable<Catalog[]>;
  cat$: Observable<any>;
  category$: Observable<any[]>;
  materials: Observable<any[]>;
  filtered: Observable<any> = of(false);

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.cat$ = this.store.select(fromStore.getSelectedCategory).take(1);
    this.category$ = this.store.select(fromStore.getCategories).take(1);
  }

  Filter(event) {
    this.store.dispatch({ type: fromStore.FILTER_MAT, payload: event });
    Object.entries(event).map(([key, value]) => {
      // console.log(key, value);
      if (value) return (this.filtered = of(value));
    });
    this.store.dispatch({ type: fromStore.FILTER, payload: this.filtered });
    this.materials = event;
  }
}
