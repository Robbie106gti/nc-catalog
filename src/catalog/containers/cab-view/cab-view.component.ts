import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';

@Component({
  selector: 'category',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<edit-cat *ngIf="e$ | async" [item]="item$ | async" (edit)="Edit($event)" (close)="Close($event)" (title)="TitleUpdate($event)"></edit-cat>
<div class="section no-pad-bot no-pad-top" id="index-banner" *ngIf="(cat$ | async) as cat">
  <div class="card" [ngClass]="{'discontinued': cat.active === false}" id="top">
    <div class="container">
      <a routerLink="/catalog" class="right" queryParamsHandling="merge">
        <i class="small material-icons">arrow_back</i>
      </a>
      <div >
        <h1 id="topic">{{ cat.title }}</h1>
      </div>
      <div class="center red-text text-darken-4 dis" *ngIf="cat.active === false">
        <b>DISCONTINUED / INACTIVE!</b>
      </div>
      <span class="right">
        <i>
          <small>Updated by:{{ cat.updatedBy }} - on: {{ cat.updatedAt }}</small>
        </i>
      </span>
      <br>
    </div>
  </div>
  <div class="row grid" id="catalog">
    <div *ngIf="!((category$ | async)?.length)">
      No items in category, add one to get started.
    </div>
    <category-view *ngFor="let category of (category$ | async)" [item]="category" class="card" [ngClass]="{'discontinued': category.active === false}">
    </category-view>
  </div>
</div>
  `,
  styles: [
    `
      .dis {
        margin-top: 0.5rem;
        margin-bottom: 0.1rem;
      }
    `
  ]
})
export class CabViewComponent implements OnInit {
  cat$: Observable<any>;
  category$: Observable<any[]>;
  item$: Observable<any>;
  e$: Observable<boolean>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.cat$ = this.store.select(fromStore.getSelectedCategory);
    this.category$ = this.store.select(fromStore.getCabinets);
    this.item$ = this.store.select(fromStore.getEditItem);
    this.e$ = this.store.select(fromStore.getEditLoaded);
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
