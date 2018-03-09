import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <div class="row">
    <div class="col s4 m4"><a [routerLink]="['./catalog']">
      <div class="card small blue-grey darken-1">
        <div class="card-image">
          <img src="../../../assets/images/nc.jpg" class="responsive-img">
          <span class="card-title">Nickels Custom Catalog</span>
        </div>
        <div class="card-content white-text">
        </div>
      </div></a>
    </div>
    <div class="col s4 m4"><a [routerLink]="['./sop']">
      <div class="card small red darken-3">
        <div class="card-image">
          <img src="../../../assets/images/SOP.jpg" class="responsive-img">
          <span class="card-title">SOP system</span>
        </div>
        <div class="card-content white-text">
        </div>
      </div></a>
    </div>
    <div class="col s4 m4"><a [routerLink]="['./mds']">
      <div class="card small orange darken-3">
        <div class="card-image">
          <img src="../../../assets/images/mds.jpg" class="responsive-img">
          <span class="card-title">MDS system</span>
        </div>
        <div class="card-content white-text">
        </div>
      </div></a>
    </div>
  </div>
  `
})
export class HomeComponent {}
