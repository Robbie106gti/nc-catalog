import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';

@Component({
  selector: 'doors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div *ngIf="(doors$ | async) as doors">
  <door-menu class="row doorMenu" (menu)="Menu($event)"></door-menu>
  <div class="row" id="slab" *ngIf="doorstyle === 'slab'">
    <div class="grid">
      <category-view *ngFor="let door of doors.slab" [item]="door" class="card">
      </category-view>
    </div>
  </div>
  <div class="row" id="recessed" *ngIf="doorstyle === 'recessed'">
    <div class="grid">
      <category-view *ngFor="let door of doors.recessed" [item]="door" class="card">
      </category-view>
    </div>
  </div>
  <div class="row" id="raised" *ngIf="doorstyle === 'raised'">
    <div class="grid">
      <category-view *ngFor="let door of doors.raised" [item]="door" class="card">
      </category-view>
    </div>
  </div>
  <div class="row" id="metal" *ngIf="doorstyle === 'metal'">
    <div class="grid">
      <category-view *ngFor="let door of doors.metal" [item]="door" class="card">
      </category-view>
    </div>
  </div>
</div>
  `,
  styles: [
    `
  .doorMenu {
    top: -10px;
    position: relative;
  }`
  ]
})
export class DoorsComponent {
  doorstyle: string = 'slab';
  doors$: Observable<any>;

  constructor(private store: Store<fromStore.ProductsState>) {
    this.doors$ = this.store.select(fromStore.filteredAndOrganizedDoors);
  }

  Menu(style) {
    return (this.doorstyle = style);
  }
}
