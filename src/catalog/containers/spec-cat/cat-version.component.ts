import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import { User } from '../../models/user.model';

@Component({
  selector: 'cat-version',
  // styleUrls: ['products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="section no-pad-bot no-pad-top" id="index-banner" *ngIf="(param$ | async) as params">
  <div class="card" id="top">
    <div class="container">
      <a routerLink="../../" class="right no-print">
        <i class="small material-icons">arrow_back</i>
      </a>
      <div id="topic">
        <h3 id="topic">Category: Materials</h3>
        <h4 id="topic">Item: {{ params.Item | titlecase }} {{ params.Version | titlecase}}</h4>
        <br>
      </div>
    </div>
  </div>

  <div class="row white z-depth-1 add" *ngIf="(query$ | async) as query">
    <div class="col s12">
      <ul class="tabs tabs-fixed-width tab-demo z-depth-0">
        <li class="tab" [ngClass]="{ 'active' : query.mat === 'painted'}">
          <a [routerLink]="['./']" [queryParams]="{ mat: 'painted' }" queryParamsHandling="merge">Painted</a>
        </li>
        <li class="tab" [ngClass]="{ 'active' : query.mat === 'wood'}">
          <a [routerLink]="['./']" [queryParams]="{ mat: 'wood' }" queryParamsHandling="merge">wood</a>
        </li>
        <li class="tab" [ngClass]="{ 'active' : query.mat === 'engineered'}">
          <a [routerLink]="['./']" [queryParams]="{ mat: 'engineered' }" queryParamsHandling="merge">Engineered</a>
        </li>
        <li class="tab" [ngClass]="{ 'active' : query.mat === 'melamine'}">
          <a [routerLink]="['./']" [queryParams]="{ mat: 'melamine' }" queryParamsHandling="merge">Melamine</a>
        </li>
        <li class="tab" [ngClass]="{ 'active' : query.mat === 'euro-materials'}">
          <a [routerLink]="['./']" [queryParams]="{ mat: 'euro-materials' }" queryParamsHandling="merge">Euro Materials</a>
        </li>
        <li class="tab" [ngClass]="{ 'active' : query.mat === 'gloss'}">
          <a [routerLink]="['./']" [queryParams]="{ mat: 'gloss' }" queryParamsHandling="merge">Gloss</a>
        </li>
        <li class="tab" [ngClass]="{ 'active' : query.mat === 'custom'}">
          <a [routerLink]="['./']" [queryParams]="{ mat: 'custom' }" queryParamsHandling="merge">Custom</a>
        </li>
      </ul>
    </div>
  </div>

  <div class="row grid" id="catalog" *ngIf="(user$ | async) as user">
    <mat-item *ngFor="let mat of (mat$ | async)" [mat]="mat"></mat-item>
  </div>
</div>
  `,
  styles: [
    `
      .add {
        border-top: 3px solid white;
        position: relative;
        top: -3px;
      }
      .timenuser {
        position: absolute;
        bottom: 0.3em;
        right: 3rem;
      }
      .tabs .tab a {
        color: #795548 !important;
        font-weight: 450 !important;
      }
      .tabs.taba: hover {
        color: #bcaaa4 !important;
        font-weight: 550 !important;
      }
      .active {
        border-bottom: 2px solid #795548;
      }
    `
  ]
})
export class CatVersionComponent implements OnInit {
  user$: Observable<User>;
  param$: Observable<any>;
  query$: Observable<any>;
  mat$: Observable<any>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.user$ = this.store.select(fromStore.getUserData);
    this.param$ = this.store.select(fromStore.getRouterParams);
    this.query$ = this.store.select(fromStore.getRouterQueryParams);
    this.mat$ = this.store.select(fromStore.getMaterials);
  }
}
