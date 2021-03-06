import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { User } from '../../models/user.model';

@Component({
  selector: 'spec-cat',
  // styleUrls: ['products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section no-pad-bot no-pad-top" id="index-banner" *ngIf="(content$ | async) as content">
      <div class="card" [ngClass]="{'discontinued': content.active === false}" id="top">
        <div class="container">
            <a routerLink="../" class="right no-print" queryParamsHandling="merge"><i class="small material-icons">arrow_back</i></a>
            <div id="topic">
                <h3 id="topic">Category: {{ TransformCat(content.sub) | titlecase }}</h3>
                <span *ngIf="(version$ | async) as version">
                  <h4 id="topic" *ngIf="version.mat !== 'metal'">Item: {{ content.title | titlecase }}<span *ngIf="version.wr === 'true'"> WR</span><span *ngIf="version.pc"> {{version.pc}}PC</span> <span *ngIf="version.mat">- {{ version.mat | titlecase }}</span></h4>
                  <h4 id="topic" *ngIf="version.mat === 'metal'">Item: {{ content.title }}</h4></span><br>
            <div class="center red-text text-darken-4" *ngIf="content.active === false">
              <b>DISCONTINUED / INACTIVE!</b>
            </div>
                <i class="timenuser hide-on-med-and-down"><small>Updated:  {{ content.updatedAt }} - {{ content.updatedBy }}</small></i>
            </div>
        </div>
      </div>

      <div class="row" id="catalog" *ngIf="(user$ | async) as user">
        <versions-doors *ngIf="content.doorstyle" class="row" [content]="content" [user]="user" (edit)="Edit($event)"></versions-doors>
        <cat-content [content]="content" [user]="user"></cat-content>
        <gen-info *ngIf="content.sub == 'general-information'" [content]="content"></gen-info>
        <door-info *ngIf="content.sub == 'doors'" [content]="content" [version$]="version$" [user]="user"></door-info>
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
export class SpecCatComponent implements OnInit {
  content$: Observable<any>;
  user$: Observable<User>;
  version$: Observable<any>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.user$ = this.store.select(fromStore.getUserData);
    this.content$ = this.store.select(fromStore.getSelectedCategoryItem).take(1);
    this.version$ = this.store.select(fromStore.getRouterQueryParams);
  }

  TransformCat(str) {
    str = str.replace(/-/g, ' ');
    return str;
  }

  Edit(event) {
    console.log(event);
  }
}
