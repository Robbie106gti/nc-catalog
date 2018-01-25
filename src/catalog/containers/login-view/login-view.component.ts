import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';
import * as Materialize from 'materialize-css/dist/js/materialize.min.js';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { tap, filter, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Login } from '../../models/login.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login-view',
  styleUrls: ['login-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="cover" *ngIf="!login$">
    <div class="row login card">
        <p class="grey-text center-align"><small><i>Use webquoin login for access to Catalog.</i></small></p>
        <div class="col m4 l2 hide-on-small-only"><div class="valign-wrapper">
            <h2 class="center-align"><i class="large material-icons">account_box</i></h2>
        </div></div>
        <div class="col m8 add-margin" *ngIf="!spinner; else spinner">
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
    login$: Observable<boolean> | false;
    login: Login = new Login();
    spinner: Observable<boolean> | false;

  constructor(
      private store: Store<fromStore.ProductsState>
    ) {}

  ngOnInit() {
      // this.login$ = of(true);
      if (!this.login$) {
            const ib = document.getElementById('body');
            ib.classList.add('stop-scrolling');
      }
      $(document).ready(function() {
        Materialize.updateTextFields();
      });
  }

  loginWQ() {
      const data = { Username: this.login.username, password: this.login.password };
      console.log(data);
      this.login = new Login();
      this.spinner = of(true);
      // this.store.dispatch(new SkuActions.AddAccessory(value));
  }
}
