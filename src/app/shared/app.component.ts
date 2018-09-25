import { Component, OnInit, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { Observable } from 'rxjs/Observable';
import { Login } from '../models/login.model';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <login-form
  [loaded]="(loaded$ | async)"
  [loading]="(loading$ | async)"
  [status]="(status$ | async)"
  [fails]="(fails$ | async)"
  (login)="loginWQ($event)"
  ></login-form>
  <app-header [user$]="user$" [router$]="router$"></app-header>
  <router-outlet *ngIf="(loaded$ | async); else notLoggedin"></router-outlet>
  <app-footer></app-footer>
  <ng-template #notLoggedin>
    <slider></slider>
  </ng-template>
  `,
  styleUrls: ['../app.styles.scss']
})
export class AppComponent implements OnInit, OnChanges {
  ib: HTMLElement;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  status$: Observable<string>;
  fails$: Observable<number>;
  user$: Observable<any>;
  router$: Observable<any>;

  constructor(private store: Store<fromStore.State>) {
    document.getElementById('splash').style.display = 'none';
    this.ib = document.getElementById('body');
    this.router$ = this.store.select(fromStore.getRouterState);
    // this.store.dispatch(new fromStore.LoadLoginHeader());
  }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadLoginHeader());
    this.loaded$ = this.store.select(fromStore.getUserLoaded);
    this.loading$ = this.store.select(fromStore.getUserLoading);
    this.status$ = this.store.select(fromStore.getUserStatus);
    this.fails$ = this.store.select(fromStore.getUserFails);
    this.user$ = this.store.select(fromStore.getUserData);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loaded$']) {
      this.matNquery(this.loaded$);
    }
  }

  loginWQ(event) {
    const data: Login = event;
    this.store.dispatch(new fromStore.LoadLogin(data));
  }

  matNquery(value) {
    if (value === true) {
      this.ib.classList.remove('stop-scrolling');
    } else {
      this.ib.classList.add('stop-scrolling');
    }
  }
}
