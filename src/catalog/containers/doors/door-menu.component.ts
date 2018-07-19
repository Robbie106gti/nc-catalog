import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'door-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <ul class="tabs tabs-fixed-width tab-demo z-depth-1">
    <li class="tab col s3">
      <a [routerLink]="['./']" [queryParams]="{ tab: 'slab' }" queryParamsHandling="merge" class="brown-text" [ngClass]="{ 'active' : params.tab === 'slab' }">Slab Face Doors</a>
    </li>
    <li class="tab col s3">
      <a [routerLink]="['./']" [queryParams]="{ tab: 'recessed' }" queryParamsHandling="merge" class="brown-text"  [ngClass]="{ 'active' : params.tab === 'recessed'}">Recessed Panel Doors</a>
    </li>
    <li class="tab col s3">
      <a [routerLink]="['./']" [queryParams]="{ tab: 'raised' }" queryParamsHandling="merge" class="brown-text"  [ngClass]="{ 'active' : params.tab === 'raised'}">Raised Panel Doors</a>
    </li>
    <li class="tab col s3">
      <a [routerLink]="['./']" [queryParams]="{ tab: 'metal' }" queryParamsHandling="merge" class="brown-text"  [ngClass]="{ 'active' : params.tab === 'metal'}">Metal Doors</a>
    </li>
  </ul>`,
  styles: [
    `
      a.active {
        font-weight: 450 !important;
        background-color: #efebe9 !important;
        border-bottom: solid 2px #4e342e;
      }
    `
  ]
})
export class DoorMenuComponent {
  @Input() params: any;
}
