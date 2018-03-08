import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { Catalog } from '../../models/catalog.model';
import { tap, filter, take } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'spec-cab',
  // styleUrls: ['products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section no-pad-bot" id="index-banner" *ngIf="(content$ | async) as content">
      <div class="card" id="top">
        <div class="container">
            <a routerLink="../" class="right"><i class="small material-icons">arrow_back</i></a>
            <div id="topic">
                <h3 id="topic">Category: {{ content.sub }}</h3>
                <h4 id="topic">Item: {{ content.title }}</h4><br>
                <i><small>Updated: {{ content.updatedBy }} - {{ content.updatedAt }}</small></i>
            </div>
        </div>
      </div>

      <div class="row" id="catalog">
        <cat-content [content]="content"></cat-content>
      </div>
    </div>
  `,
})
export class SpecCatComponent implements OnInit {
    content$: Observable<any>;

  constructor(private store: Store<fromStore.ProductsState>) { }

  ngOnInit() {
    this.content$ = this.store.select(fromStore.getSelectedCategoryItem);
   }
}
