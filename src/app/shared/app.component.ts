import { Component, OnInit, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs/Observable';
declare var $: any;
declare var Materialize: any;

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
  <div class="slider fullscreen" style="touch-action: pan-y; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
    <ul class="slides">
      <li class="velocity-animating" style="opacity: 0.940592; transform: translateX(0px) translateY(0px);">
        <img src="https://webquoin.com/catalog/build/assets/nickels%20kitchens/09.jpg"> <!-- random image -->
        <div class="caption center-align velocity-animating" style="opacity: 0.997476; transform: translateY(-0.252449px) translateX(0px);">
          <h3>Retro modern</h3>
          <h5 class="light grey-text text-lighten-3">Black walnut with clean lines</h5>
        </div>
      </li>
      <li class="velocity-animating active" style="opacity: 0.0594076; transform: translateX(0px) translateY(0px);">
        <img src="https://webquoin.com/catalog/build/assets/nickels%20kitchens/img_8297-1024x708.jpg"> <!-- random image -->
        <div class="caption left-align velocity-animating" style="opacity: 0; transform: translateX(-100px) translateY(0px);">
          <h3>Old and new</h3>
          <h5 class="light grey-text text-lighten-3">Combing latest materials on more classical styles.</h5>
        </div>
      </li>
      <li class="" style="opacity: 0; transform: translateX(0px) translateY(0px);">
        <img src="https://webquoin.com/catalog/build/assets/nickels%20kitchens/oseen-kitchen-1024x579.jpg"> <!-- random image -->
        <div class="caption right-align" style="opacity: 0; transform: translateX(100px) translateY(0px);">
          <h3>Clean modern kitchens</h3>
          <h5 class="light grey-text text-lighten-3">Clean integrated handles accross all cabinets</h5>
        </div>
      </li>
    </ul>
    <ul class="indicators"><li class="indicator-item"></li><li class="indicator-item active"></li><li class="indicator-item"></li></ul>
  </div>
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

  constructor(
      private store: Store<fromStore.State>
    ) {
      document.getElementById('splash').style.display = 'none';
      $(document).ready(function(){
        $('.slider').slider();
      });
        this.ib = document.getElementById('body');
        this.router$ = this.store.select(fromStore.getRouterState);
        this.store.dispatch(new fromStore.LoadLoginFbCk());
    }
  ngOnInit () {
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
            $(document).ready(function() { Materialize.updateTextFields(); });
        }
    }
 }
