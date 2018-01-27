import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { Login } from '../../models/login.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login-item',
  styleUrls: ['login-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <form [formGroup]="form">
  <div class="cover" *ngIf="!loaded">
    <div class="row login card">
        <p class="grey-text center-align"><small><i>Use webquoin login for access to Catalog.</i></small></p>
        <div class="col m4 l2 hide-on-small-only"><div class="valign-wrapper">
            <h2 class="center-align"><i class="large material-icons">account_box</i></h2>
        </div></div>
        <div class="col m8 add-margin" *ngIf="!loading; else spinner">
            <div class="input-field">
                <input id="first_name" type="text" class="validate" formControlName="username" autocomplete="current-username">
                <label for="first_name" data-error="wrong" data-success="right">Username</label>
            </div>
            <div class="input-field">
                <input id="password" type="password" class="validate" formControlName="password"
                onkeydown = "if (event.keyCode == 13) document.getElementById('loginWQ').click()" autocomplete="current-password">
                <label for="password">Password</label>
            </div><br>
            <button id="loginWQ" class="btn-floating halfway-fab waves-effect waves-light blogin"
            [ngClass]="{
                'orange': passwordPristine,
                'teal': !passwordPristine
              }"
            (click)='loginWQ(form)' [disabled]="formTouched" >
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
  </form>
  `,
})
export class LoginItemComponent {
  @Input() loaded: boolean;
  @Input() loading: boolean;
  @Output() login = new EventEmitter<Login>();

  form = this.fb.group({
    username: ['', Validators.required && Validators.minLength(3)],
    password: ['', Validators.required && Validators.minLength(3)],
  });

  constructor(private fb: FormBuilder) {}

  get formTouched() {
    return this.form.untouched && this.form.pristine as Boolean;
  }

  get passwordPristine() {
    return this.form.get('password').pristine as Boolean;
  }

  loginWQ(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.login.emit(value);
    }
  }
}
