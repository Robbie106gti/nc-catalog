import { Component, ChangeDetectionStrategy, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Dropdowns, Tooltips } from '../materialize/selectors';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <nav>
    <div class="nav-wrapper brown darken-3">
      <div class="whiteLine"></div>
      <a [routerLink]="['..']" class="brand-logo" *ngIf="(router$ | async) as router">
        <img class="imageLogo" src="/assets/icons/logoNC.png" alt="Nickels Cabinets"/>
        <span class="headingLogo" ><i class="material-icons">{{ icon | async }}</i> {{ TitleChange(router.state.url) | titlecase }}</span>
      </a>

      <ul class="right hide-on-med-and-down">
        <li><a #dropdown name="dropdown" class="dropdown-trigger" data-target="dropdown2"><span>{{ (user$ | async)?.fullName }}</span></a></li>
        <li >
        <a [routerLink]="[where, 'search']"  #tooltipped class="tooltipped" data-position="left" data-tooltip="Search SOPs only"><i class="material-icons">search</i></a>
        </li>
        <!-- Dropdown Trigger -->
        <li><a #dropdown name="dropdown" class="dropdown-trigger" data-target="dropdown1"><i class="large material-icons">apps</i></a></li>
      </ul>
    </div>
    <!-- Dropdown Structure -->
    <ul id="dropdown1" class="dropdown-content uTop">
      <li #tooltipped class="tooltipped" data-position="left" data-tooltip="Catalogue">
        <a [routerLink]="['./catalog']" class="right">
          <i class="material-icons blue-grey-text">collections_bookmark</i>
        </a>
      </li>
      <li *ngIf="(user$ | async)?.roles?.sop">
        <a #tooltipped class="right tooltipped" data-position="left" data-tooltip="(SOP) Standard Operating Procedure" [routerLink]="['./sop']">
          <i class="material-icons red-text">assignment</i>
        </a>
      </li>
      <li *ngIf="(user$ | async)?.roles?.nickels">
        <a #tooltipped class="right tooltipped" data-position="left" data-tooltip="(MDS) Material Data Sheet" [routerLink]="['./mds']">
          <i class="material-icons orange-text">style</i>
        </a>
      </li>
      <li class="divider"></li>
    </ul>
    <ul id="dropdown2" class="dropdown-content uTop">
      <li>
        <a [routerLink]="['./profile']" #tooltipped
        class="right tooltipped" data-position="left" data-tooltip="Profile">
          <i class="material-icons blue-grey-text left">person</i>Profile
        </a>
      </li>
      <li *ngIf="(user$ | async)?.roles?.nickels">
        <a [routerLink]="['./users']" #tooltipped
        class="right tooltipped" data-position="left" data-tooltip="All users">
          <i class="material-icons blue-grey-text left">recent_actors</i>Users
        </a>
      </li>
      <li class="divider"></li>
      <li>
        <a #tooltipped class="right tooltipped" data-position="left" data-tooltip="Log out" (click)="Logout()">
          <i class="material-icons left">settings_power</i>Log out
        </a>
      </li>
    </ul>
    <a id="TopPage"></a>
  </nav>
  `,
  styles: [
    `
      nav {
        z-index: 4;
        position: relative;
      }
      .uTop {
        top: auto !important;
      }
    `
  ]
})
export class HeaderComponent implements AfterViewInit, OnChanges {
  user$: Observable<any>;
  router$: Observable<any>;
  icon: Observable<string>;
  where: string;

  constructor(private store: Store<fromStore.State>, private router: Router) {
    this.user$ = this.store.select(fromStore.getUserData);
    this.router$ = this.store.select(fromStore.getRouterState);
  }

  ngAfterViewInit(): void {
    Dropdowns();
    Tooltips();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user$'] || changes['router$']) {
      Dropdowns();
      Tooltips();
    }
  }

  TitleChange(str) {
    str = str.split('/');
    str = str[1] ? str[1] : null;
    switch (str) {
      case 'catalog':
        this.where = str;
        this.icon = of('collections_bookmark');
        str = 'Catalog';
        break;
      case 'sop':
        this.where = str;
        this.icon = of('assignment');
        str = 'Standard operating procedure';
        break;
      case 'mds':
        this.where = str;
        this.icon = of('style');
        str = 'Material Data Sheets';
        break;
      default:
        this.where = 'sop';
        this.icon = of('collections_bookmark');
        str = 'Nickels Cabinets';
    }
    return str;
  }

  Search(str) {
    str = str.split('/');
    str = str[1] ? str[1] : null;
    switch (str) {
      case 'catalog':
        this.router.navigate(['catalog', 'search']);
        break;
      case 'sop':
        this.router.navigate(['../sop/search']);
        break;
      case 'mds':
        this.router.navigate(['mds', 'search']);
        break;
      default:
        this.router.navigate(['search']);
    }
  }

  Logout() {
    const expires = 'Thu, 01 Jan 1970 01: 00: 08 UTC';
    document.cookie = 'nc-catalog=' + expires + ';path=/';
    location.reload();
  }
}
