import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';
import * as Materialize from 'materialize-css/dist/js/materialize.min.js';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Login } from '../../models/login.model';
import { tap, filter, take, share, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { WQUser } from '../../models/user.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login-view',
  styleUrls: ['login-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="cover" *ngIf="!loaded">
    <div class="row login card">
        <p class="grey-text center-align"><small><i>Use webquoin login for access to Catalog.</i></small></p>
        <div class="col m4 l2 hide-on-small-only"><div class="valign-wrapper">
            <h2 class="center-align"><i class="large material-icons">account_box</i></h2>
        </div></div>
        <div class="col m8 add-margin" *ngIf="!loading; else spinner">
            <div class="input-field">
                <input id="first_name" type="text" class="validate" [(ngModel)]="login.username" required>
                <label for="first_name" data-error="wrong" data-success="right">Username</label>
            </div>
            <div class="input-field">
                <input id="password" type="password" class="validate" [(ngModel)]="login.password"
                onkeydown = "if (event.keyCode == 13) document.getElementById('loginWQ').click()"
                required minlength="2">
                <label for="password">Password</label>
            </div><br>
            <button id="loginWQ" class="btn-floating halfway-fab waves-effect waves-light blogin"
            [ngClass]="{
                'orange':!login.password,
                'teal':login.password
            }"
            (click)='loginWQ()' [disabled]="!login.username" >
                <i class="material-icons">play_arrow</i>
            </button>
        </div>
    </div>
  </div>

  <ng-template #spinner>
  <div class="login-spinner">
    <div class="preloader-wrapper big active ">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-red">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-yellow">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-green">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
      </div>
    </div>
  </ng-template>
  `,
})
export class LoginViewComponent implements OnInit {
  login: Login = new Login();
  loaded: boolean;
  loading: boolean;
  ib: any;

  constructor(
      private store: Store<fromStore.ProductsState>
    ) {}

  ngOnInit() {
    this.ib = document.getElementById('body');
      this.store.select(fromStore.getUserLoaded).subscribe(loaded => {
        this.matNquery(loaded);
        this.loaded = loaded;
      });
      this.store.select(fromStore.getUserLoading).subscribe(loading => this.loading = loading);
  }

  loginWQ() {
      const data: Login = { username: this.login.username, password: this.login.password };
      this.login = new Login();
      this.store.dispatch( new fromStore.LoadLogin(data));
  }

  matNquery(value) {
      if (value === false) {
        this.ib.classList.add('stop-scrolling');
        $(document).ready(function() { Materialize.updateTextFields(); });
      } else {
        this.ib.classList.remove('stop-scrolling');
      }
  }
}
