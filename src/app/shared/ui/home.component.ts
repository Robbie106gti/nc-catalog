import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  template: `
  <div class="grid" *ngIf="(roles$ | async) as roles">
    <div class="card blue-grey darken-1" *ngIf="roles.reader">
      <a [routerLink]="['./catalog', { root: 'Catalog'}]">
        <div class="card-image card20">
          <img src="../../../assets/images/nc.jpg" class="responsive-img">
        </div>
        <div class="card-content white-text">
          <span class="card-title">Nickels Custom Catalog</span>
        </div>
      </a>
    </div>
    <div class="card red darken-3" *ngIf="roles.nickels">
      <a [routerLink]="['./sop', { root: 'SOP'}]">
        <div class="card-image card20">
          <img src="../../../assets/images/SOP.jpg" class="responsive-img">
        </div>
        <div class="card-content white-text">
          <span class="card-title">SOP system</span>
        </div>
      </a>
    </div>
    <div class="card orange darken-3" *ngIf="roles.nickels">
      <a [routerLink]="['./mds', { root: 'MDS'}]">
        <div class="card-image card20">
          <img src="../../../assets/images/mds.jpg" class="responsive-img">
        </div>
        <div class="card-content white-text">
          <span class="card-title">MDS system</span>
        </div>
      </a>
    </div>
  </div>
  `
})
export class HomeComponent {
  roles$: Observable<any>;

  constructor(private store: Store<fromStore.State>) {
    this.roles$ = this.store.select(fromStore.getUserRoles);
  }
}
