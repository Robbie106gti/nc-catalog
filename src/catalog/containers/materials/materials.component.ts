import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';

@Component({
  selector: 'materials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="row">
  <div class="col s5 offset-s1">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title flow-text">General information and Material Standard's (MMDS)</span>
        <div class="collection">
          <a href="#!" class="collection-item blue-grey darken-1 white-text">General Information Material Sizes</a>
          <a href="#!" class="collection-item blue-grey darken-1 white-text">Paint Standards</a>
          <a href="#!" class="collection-item blue-grey darken-1 white-text">Stain Standards</a>
          <a href="#!" class="collection-item blue-grey darken-1 white-text">Premium Stain Standards</a>
          <a href="#!" class="collection-item blue-grey darken-1 white-text">Nature's Standards</a>
          <a href="#!" class="collection-item blue-grey darken-1 white-text">Sheen Standards</a>
        </div>
      </div>
    </div>
  </div>
  <div class="col s5">
    <div class="card">
      <div class="card-content">
        <span class="card-title flow-text">Materials and Finishes Header Dropdown-menu's</span>
        <div class="collection">
          <a [routerLink]="['materials', 'exterior']" class="collection-item">Exterior Materials</a>
          <a [routerLink]="['interior-materials']" class="collection-item">Interior Materials</a>
          <a [routerLink]="['colors']" class="collection-item">Colors Options</a>
          <a [routerLink]="['sheen']" class="collection-item">Sheen Options</a>
          <a [routerLink]="['special-finish']" class="collection-item">Special Finish Options</a>
        </div>
      </div>
    </div>
  </div>
</div>

  `,
  styles: [``]
})
export class MaterialsComponent {
  constructor(private store: Store<fromStore.ProductsState>) {}
}
