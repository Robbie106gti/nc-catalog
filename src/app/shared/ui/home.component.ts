import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="grid" *ngIf="(roles$ | async) as roles">
    <div class="card blue-grey darken-1" *ngIf="roles.reader">
      <a [routerLink]="['./catalog']">
        <div class="card-image card20">
          <img src="../../../assets/images/nc.jpg" class="responsive-img">
        </div>
        <div class="card-content white-text">
          <span class="card-title">Nickels Custom Catalog</span>
        </div>
      </a>
    </div>
    <div class="card red darken-3" *ngIf="roles.sop">
      <a [routerLink]="['./sop']">
        <div class="card-image card20">
          <img src="../../../assets/images/SOP.jpg" class="responsive-img">
        </div>
        <div class="card-content white-text">
          <span class="card-title">SOP system</span>
        </div>
      </a>
    </div>
    <div class="card orange darken-3" *ngIf="roles.nickels">
      <a [routerLink]="['./mds']">
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
