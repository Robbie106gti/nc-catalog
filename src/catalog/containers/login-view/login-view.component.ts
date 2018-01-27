import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Login } from '../../models/login.model';
import { Observable } from 'rxjs/Observable';
declare var $: any;
declare var Materialize: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<login-item [loaded]="loaded$ | async" [loading]="loading$ | async" (login)="loginWQ($event)"></login-item>`,
})
export class LoginViewComponent implements OnInit {
  ib: HTMLElement;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;

  constructor(
      private store: Store<fromStore.ProductsState>
    ) {}

  ngOnInit() {
    this.ib = document.getElementById('body');
    this.loaded$ = this.store.select(fromStore.getUserLoaded);
    this.loading$ = this.store.select(fromStore.getUserLoading);
    this.loaded$.subscribe(loaded => this.matNquery(loaded));
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
