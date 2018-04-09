import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <div class="grid">
    <div class="card blue-grey darken-1">
      <a [routerLink]="['./catalog', { root: 'Catalog'}]">
        <div class="card-image card20">
          <img src="../../../assets/images/nc.jpg" class="responsive-img">
        </div>
        <div class="card-content white-text">
          <span class="card-title">Nickels Custom Catalog</span>
        </div>
      </a>
    </div>
    <div class="card red darken-3">
      <a [routerLink]="['./sop', { root: 'SOP'}]">
        <div class="card-image card20">
          <img src="../../../assets/images/SOP.jpg" class="responsive-img">
        </div>
        <div class="card-content white-text">
          <span class="card-title">SOP system</span>
        </div>
      </a>
    </div>
    <div class="card orange darken-3">
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
export class HomeComponent {}
