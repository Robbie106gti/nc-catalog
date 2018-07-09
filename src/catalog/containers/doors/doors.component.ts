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
<a class="btn-floating red floated" (click)="Adddoors()"><i class="material-icons">add</i></a>
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

  constructor(private store: Store<fromStore.ProductsState>) {
    this.doors$ = this.store.select(fromStore.filteredAndOrganizedDoors);
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
