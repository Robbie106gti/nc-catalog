import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { Catalog } from '../../models/catalog.model';
import { Cabinets } from '../../models/cabinets.model';
import { tap, filter, take } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'spec-cab',
  // styleUrls: ['products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <login-view></login-view>
    <div class="section no-pad-bot" id="index-banner" *ngIf="(content$ | async) as content">
      <div class="card" id="top">
        <div class="container">
            <a routerLink="../" class="right"><i class="small material-icons">arrow_back</i></a>
            <div id="topic">
                <h3 id="topic">Category: {{ content.sub }}</h3>
                <h4 id="topic">Item: {{ content.title }}</h4><br>
            </div>
        </div>
      </div>

      <div class="row" id="catalog">
        <div class="col s12 m6">
            <description-card [content]="content"></description-card>
            <spec-content [content]="content"></spec-content>
        </div>
      </div>
    </div>
  `,
})
export class SpecCabComponent implements OnInit {
    content$: Observable<any>;

  constructor(private store: Store<fromStore.ProductsState>) { }

  ngOnInit() {
    this.content$ = this.store.select(fromStore.getSelectedCabinetItem);
   }
}
