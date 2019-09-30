
import {take} from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import { User } from '../../models/user.model';

@Component({
  selector: 'spec-cab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './spec-cab.component.html'
})
export class SpecCabComponent implements OnInit {
  content: any;
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
    this.Take(2);
  }

  TransformCat(str) {
    str = str.replace(/-/g, ' ');
    return str;
  }

  Take(count) {
    this.store
      .select(fromStore.getSelectedCabinetItem).pipe(
      take(count))
      .subscribe(c => (this.content = c));
  }
}
