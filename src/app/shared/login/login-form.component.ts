import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Login } from '../../models/login.model';
declare var M: any;

@Component({
  selector: 'login-form',
  styleUrls: ['login-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-form.html'
})
export class LoginFormComponent implements AfterViewInit {
  @Input()
  loaded: boolean;
  @Input()
  loading: boolean;
  @Input()
  status: string;
  @Input()
  fails: number;
  @Output()
  login = new EventEmitter<Login>();

  form = this.fb.group({
    username: ['', Validators.required && Validators.minLength(3)],
    password: ['', Validators.required && Validators.minLength(3)]
  });

  constructor(private fb: FormBuilder) {}

  ngAfterViewInit(): void {
    M.updateTextFields();
  }

  get formTouched() {
    return this.form.untouched && (this.form.pristine as Boolean);
  }

  get passwordPristine() {
    return this.form.get('password').pristine as Boolean;
  }

  resetFail() {
    this.fails = 0;
  }

  loginWQ(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.login.emit(value);
    }
  }
}
