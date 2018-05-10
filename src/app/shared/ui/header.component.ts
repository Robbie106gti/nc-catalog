import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var M: any;

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <nav>
    <div class="nav-wrapper brown darken-3">
      <div class="whiteLine"></div>
      <a href="https://nickels-catalog.firebaseapp.com/" class="brand-logo">
        <img class="imageLogo" src="/assets/icons/logoNC.png" alt="Nickels Cabinets"/>
        <span class="headingLogo" *ngIf="(router$ | async)?.state.params?.root ==='Catalog'"> <i class="material-icons">collections_bookmark</i> Catalog</span>
        <span class="headingLogo" *ngIf="(router$ | async)?.state.params?.root ==='MDS'"> <i class="material-icons">style</i> Material Data Sheets</span>
        <span class="headingLogo" *ngIf="(router$ | async)?.state.params?.root ==='SOP'"> <i class="material-icons">assignment</i> SOP</span>
      </a>

      <ul class="right hide-on-med-and-down">
        <li><a class="dropdown-trigger" href="#" data-target="dropdown2"><span>{{ (user$ | async)?.fullName }}</span></a></li>
        <li><a href="#"><i class="material-icons">search</i></a></li>
        <!-- Dropdown Trigger -->
        <li ><a class="dropdown-trigger" href="#" data-target="dropdown1"><i class="large material-icons">apps</i></a></li>
      </ul>
    </div>
    <!-- Dropdown Structure -->
    <ul id="dropdown1" class="dropdown-content uTop">
      <li class="tooltipped" data-position="bottom" data-tooltip="Catalogue">
        <a [routerLink]="['./catalog', { root: 'Catalog'}]" class="right">
          <i class="material-icons blue-grey-text">collections_bookmark</i>
        </a>
      </li>
      <li *ngIf="(user$ | async)?.roles?.admin">
        <a class="right tooltipped" data-position="bottom" data-tooltip="(SOP) Standard Operating Procedure" [routerLink]="['./sop', { root: 'SOP'}]">
          <i class="material-icons red-text">assignment</i>
        </a>
      </li>
      <li *ngIf="(user$ | async)?.roles?.admin">
        <a class="right tooltipped" data-position="bottom" data-tooltip="(MDS) Material Data Sheet" [routerLink]="['./mds', { root: 'MDS'}]">
          <i class="material-icons orange-text">style</i>
        </a>
      </li>
      <li class="divider"></li>
    </ul>
    <ul id="dropdown2" class="dropdown-content uTop">
      <li>
        <a [routerLink]="['./catalog', { root: 'Catalog'}]"
        class="right tooltipped" data-position="bottom" data-tooltip="Profile">
          <i class="material-icons blue-grey-text left">person</i>Profile
        </a>
      </li>
      <li class="divider"></li>
      <li>
        <a class="right tooltipped" data-position="bottom" data-tooltip="Log out">
          <i class="material-icons left">settings_power</i>Log out
        </a>
      </li>
    </ul>
    <a id="TopPage"></a>
  </nav>
  `,
  styles: [
    `
  .uTop {
    top: auto !important;
  }
  `
  ]
})

// <li><a class="right" [routerLink]="['../']"><i class="material-icons">arrow_back</i></a></li>
export class HeaderComponent implements OnChanges {
  @Input() user$: Observable<any>;
  @Input() router$: Observable<any>;

  constructor() {
    document.addEventListener('DOMContentLoaded', function() {
      const options = { hover: true };
      const elems = document.querySelectorAll('.dropdown-trigger');
      const instances = M.Dropdown.init(elems, options);
    });
    document.addEventListener('DOMContentLoaded', function() {
      const options = {};
      const elems = document.querySelectorAll('.tooltipped');
      const instances = M.Tooltip.init(elems, options);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user$']) {
      document.addEventListener('DOMContentLoaded', function() {
        const options = { hover: true };
        const elems = document.querySelectorAll('.dropdown-trigger');
        const instances = M.Dropdown.init(elems, options);
      });
      document.addEventListener('DOMContentLoaded', function() {
        const options = {};
        const elems = document.querySelectorAll('.tooltipped');
        const instances = M.Tooltip.init(elems, options);
      });
    }
  }
}
