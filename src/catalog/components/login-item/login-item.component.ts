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
  templateUrl: './login-item.html',
})
export class LoginItemComponent {
  @Input() loaded: boolean;
  @Input() loading: boolean;
  @Input() status: string;
  @Input() fails: number;
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
