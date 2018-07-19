import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';

@Component({
  selector: 'doors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div *ngIf="(doors$ | async) as doors">
  <div *ngIf="(param$ | async) as params">
    <door-menu class="row doorMenu" (menu)="Menu($event)" [params]="params"></door-menu>
    <div class="row">
      <div class="grid" *ngIf="params.tab; else slab">
        <category-view *ngFor="let door of doors[params.tab]" [item]="door" class="card">
        </category-view>
      </div>
    </div>
    <a class="btn-floating red floated" (click)="Adddoors()">
      <i class="material-icons">add</i>
    </a>
    <ng-template #slab>
      <div class="grid">
        <category-view *ngFor="let door of doors.slab" [item]="door" class="card">
        </category-view>
      </div>
    </ng-template>
  </div>
</div>
  `,
  styles: [
    `
      .doorMenu {
        top: -10px;
        position: relative;
      }
      .floated {
        position: absolute;
        bottom: 3rem;
        right: 3rem;
      }
    `
  ]
})
export class DoorsComponent {
  doorstyle: string = 'slab';
  doors$: Observable<any>;
  param$: Observable<any>;

  constructor(private store: Store<fromStore.ProductsState>) {
    this.doors$ = this.store.select(fromStore.filteredAndOrganizedDoors);
    this.param$ = this.store.select(fromStore.getRouterQueryParams);
  }

  Menu(style) {
    return (this.doorstyle = style);
  }

  Adddoors() {
    this.doors$.take(1).subscribe(doors => {
      console.log(doors);
      const newDoor = doors.slab[4];
      this.store.dispatch({
        type: fromStore.EDIT_DOOR,
        payload: newDoor
      });
    });
  }
}
