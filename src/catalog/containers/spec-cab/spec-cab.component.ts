import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { User } from '../../models/user.model';

@Component({
  selector: 'spec-cab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './spec-cab.component.html'
})
export class SpecCabComponent implements OnInit {
  content: any;
  specs: any;
  iwhd: any;
  notes: any;
  addons: any;
  user$: Observable<User>;
  param$: Observable<any>;
  specials$: Observable<any>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.user$ = this.store.select(fromStore.getUserData);
    this.param$ = this.store.select(fromStore.getRouterParams);
    this.specials$ = this.store.select(fromStore.getCabSpecials);
    this.Take(1);
  }

  Fetch(e) {
    this.Take(1);
  }

  TransformCat(str) {
    str = str.replace(/-/g, ' ');
    return str;
  }

  Take(count) {
    this.store
      .select(fromStore.getSelectedCabinetItem)
      .take(count)
      .subscribe(c => (this.content = c));
    this.store
      .select(fromStore.getCabSpecs)
      .take(count)
      .subscribe(s => (this.specs = s));
    this.store
      .select(fromStore.getCabIWHDs)
      .take(count)
      .subscribe(i => (this.iwhd = i));
    this.store
      .select(fromStore.getCabNotes)
      .take(count)
      .subscribe(n => (this.notes = n));
    this.store
      .select(fromStore.getCabAddons)
      .take(count)
      .subscribe(a => (this.addons = a));
  }
}
