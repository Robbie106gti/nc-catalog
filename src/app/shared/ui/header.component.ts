import {
  Component,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <!-- Dropdown Structure -->
  <ul id="dropdown1" class="dropdown-content">
    <li><a [routerLink]="['./catalog']" class="right"><i class="material-icons blue-grey-text">collections_bookmark</i></a></li>
    <li *ngIf="(user$ | async).roles?.admin"><a  class="right" [routerLink]="['./mds']"><i class="material-icons orange-text">view_module</i></a></li>
    <li *ngIf="(user$ | async).roles?.admin"><a class="right" [routerLink]="['./sop']"><i class="material-icons red-text">cloud</i></a></li>
    <li class="divider"></li>
    <li *ngIf="(user$ | async).roles?.admin"><a class="right" [routerLink]="['../']"><i class="material-icons">arrow_back</i></a></li>
  </ul>
  <nav>
    <div class="nav-wrapper brown darken-3">
      <div class="whiteLine"></div>
      <a href="https://nickels-catalog.firebaseapp.com/" class="brand-logo">
        <img class="imageLogo" src="/assets/icons/logoNC.png" alt="Nickels Cabinets"/>
        <span class="headingLogo"> <i class="material-icons">collections_bookmark</i> Catalog</span>
      </a>

      <ul class="right hide-on-med-and-down">
        <li><a href="#!"><span>{{ (user$ | async)?.fullName }}</span></a></li>
        <li><a href="#!"><i class="material-icons">search</i></a></li>
        <!-- Dropdown Trigger -->
        <li ><a class="dropdown-button" href="#!" data-activates="dropdown1"><i class="large material-icons">apps</i></a></li>
      </ul>
    </div>
    <a id="TopPage"></a>
  </nav>
  `
})
export class HeaderComponent {
  @Input() user$: Observable<any>;
  constructor() {
    $('.dropdown-button').dropdown();
   }
}
