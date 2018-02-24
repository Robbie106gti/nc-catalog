import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { Catalog } from '../../models/catalog.model';
import { Cabinets } from '../../models/cabinets.model';
import { tap, filter, take } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'spec-cab',
  // styleUrls: ['products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div *ngIf="(param$ | async)as param">
  <login-view></login-view>
  <form-cab *ngIf="editing" [user]="(user$ | async)" (close)="Close($event)"></form-cab>
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
        <versions-bar *ngIf="!param.Version" class="row" [content]="content" [user]="user$ | async" (edit)="Edit($event)"></versions-bar>
        <div class="row">
          <div class="col s12 m6">
            <description-card [content]="content"></description-card>
            <spec-content [specs]="specs" [iwhd]="iwhd" [user]="user$ | async" [results$]="results$" (search)="Search($event)" (update)="Update($event)"></spec-content>
            <note-item *ngIf="notes[0]" [notes]="notes"></note-item>
          </div>
          <div class="col s12 m6">
            <slider-images [content]="content" [param]="param"></slider-images>
          </div>
          <div class="col s12 m6">
            <add-custom [addons]="addons"></add-custom>
            <table-item *ngIf="content.table" [content]="content"></table-item>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
})
export class SpecCabComponent implements OnInit {
  content$: Observable<any>;
  specs: any;
  iwhd: any;
  notes: any;
  addons: any;
  user$: Observable<User>;
  param$: Observable<any>;
  editing: Boolean;
  results$: Observable<any>;

  constructor(private store: Store<fromStore.ProductsState>) { }

  ngOnInit() {
    this.content$ = this.store.select(fromStore.getSelectedCabinetItem);
    this.user$ = this.store.select(fromStore.getUserData);
    this.param$ = this.store.select(fromStore.getRouterParams);
    this.results$ = this.store.select(fromStore.getSearchResults);
    this.Take();
   }

   Edit(event) {
     this.store.dispatch({type: fromStore.CREATE_EDIT_CAB, payload: event});
     this.editing = true;
   }

   Close(event) {
     this.editing = false;
   }

   Search(event) {
    this.store.dispatch({ type: fromStore.SEARCH, payload: event });
   }

   Update(event) {
     this.store.dispatch({ type: fromStore.UPDATE_CABINET, payload: event });
     this.Take();
   }

   Take() {
    this.store.select(fromStore.getCabSpecs).take(1).subscribe(s => this.specs = s);
    this.store.select(fromStore.getCabIWHDs).take(1).subscribe(i => this.iwhd = i);
    this.store.select(fromStore.getCabNotes).take(1).subscribe(n => this.notes = n);
    this.store.select(fromStore.getCabAddons).take(1).subscribe(a => this.addons = a);
   }
}
