import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <div class="row">
    <div class="col s4 m4"><a [routerLink]="['./catalog']">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          I will link to the catalog (B2B)
        </div>
      </div></a>
    </div>
    <div class="col s4 m4"><a [routerLink]="['./']">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          I will link to the Replacement parts (for Home owner)
        </div>
      </div></a>
    </div>
    <div class="col s4 m4"><a href="https://modconvanity.com/">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
        I will link to Modcon (Both)
        </div>
      </div></a>
    </div>
  </div>
  `
})
export class HomeComponent {}
