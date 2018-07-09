import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { User } from '../../models/user.model';

@Component({
  selector: 'cat-version',
  // styleUrls: ['products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section no-pad-bot no-pad-top" id="index-banner">
      <div class="card" id="top">
        <div class="container">
          <a routerLink="../" class="right no-print"><i class="small material-icons">arrow_back</i></a>
          <div id="topic">
            <h3 id="topic">Category: Materials</h3>
            <h4 id="topic">Item: Exterior</h4>
            <br>
            <i class="timenuser hide-on-med-and-down"><small>Updated:  ...</small></i>
          </div>
        </div>
      </div>

      <div class="row" id="catalog" *ngIf="(user$ | async) as user">
        <h1> hello  </h1>
        <pre>{{ param$ | async | json }}</pre>
      </div>
    </div>
  `,
  styles: [
    `
      .timenuser {
        position: absolute;
        bottom: 0.3em;
        right: 3rem;
      }
    `
  ]
})
export class CatVersionComponent implements OnInit {
  user$: Observable<User>;
  param$: Observable<any>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.user$ = this.store.select(fromStore.getUserData);
    this.param$ = this.store.select(fromStore.getRouterParams);
  }
}
