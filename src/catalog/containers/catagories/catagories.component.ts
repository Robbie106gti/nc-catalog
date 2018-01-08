import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { Catalog } from '../../models/catalog.model';

@Component({
  selector: 'catagories',
  // styleUrls: ['products.component.scss'],
  template: `
    <div class="section no-pad-bot" id="index-banner">
      <div class="row grid" id="catalog">
        <div *ngIf="!((catagories$ | async)?.length)">
          No catagories, add one to get started.
        </div>
        <catagory-item
          *ngFor="let catagory of (catagories$ | async)"
          [catagory]="catagory" class="card">
        </catagory-item>
      </div>
    </div>
  `,
})
export class CatagoriesComponent implements OnInit {
  catagories$: Observable<Catalog[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.catagories$ = this.store.select(fromStore.getCatalogBase);
    this.catagories$.subscribe(catagories => console.log(catagories));
  }
}
