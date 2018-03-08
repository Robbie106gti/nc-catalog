import { Component, OnInit, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';

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
  template: `<login-item [loaded]="loaded$ | async" [loading]="(loading$ | async)" [status]="(status$ | async)" [fails]="(fails$ | async)" (login)="loginWQ($event)"></login-item>`,
})

export class LoginViewComponent implements OnChanges {
  ib: HTMLElement;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  status$: Observable<string>;
  fails$: Observable<number>;

  constructor(
      private store: Store<fromStore.ProductsState>
    ) {
        this.ib = document.getElementById('body');
        this.loaded$ = this.store.select(fromStore.getUserLoaded);
        this.loading$ = this.store.select(fromStore.getUserLoading);
        this.status$ = this.store.select(fromStore.getUserStatus);
        this.fails$ = this.store.select(fromStore.getUserFails);
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
