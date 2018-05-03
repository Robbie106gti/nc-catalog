import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { Catalog } from '../../models/catalog.model';
import { tap, filter, take } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Component({
  selector: 'spec-cab',
  // styleUrls: ['products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section no-pad-bot" id="index-banner" *ngIf="(content$ | async) as content">
      <div class="card" id="top">
        <div class="container">
            <a routerLink="../" class="right"><i class="small material-icons">arrow_back</i></a>
            <div id="topic">
                <h3 id="topic">Category: {{ content.sub | titlecase }}</h3>
                <h4 id="topic">Item: {{ content.title | titlecase }}</h4><br>
                <i><small>Updated: {{ content.updatedBy }} - {{ content.updatedAt }}</small></i>
            </div>
        </div>
      </div>

      <div class="row" id="catalog">
        <cat-content [content]="content" [user]="(user$ | async)"></cat-content>
      </div>
    </div>
  `
})
export class SpecCatComponent implements OnInit {
  content$: Observable<any>;
  user$: Observable<User>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.user$ = this.store.select(fromStore.getUserData);
    this.content$ = this.store.select(fromStore.getSelectedCategoryItem).take(1);
  }
}
