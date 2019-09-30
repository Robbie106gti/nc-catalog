import { Component, ChangeDetectionStrategy, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs';
import { Login } from '../../models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <login-form
  [loaded]="(loaded$ | async)"
  [loading]="(loading$ | async)"
  [status]="(status$ | async)"
  [fails]="(fails$ | async)"
  (login)="loginWQ($event)"
  ></login-form>
  <slider></slider>
  `
})
export class LoginComponent implements OnInit {
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  fails$: Observable<number>;
  router$: Observable<any>;
  status$: Observable<any>;
  redirect$: Observable<any>;

  constructor(private router: Router, private store: Store<fromStore.State>) {
    this.router$ = this.store.select(fromStore.getRouterState);
  }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadLoginHeader());
    this.loaded$ = this.store.select(fromStore.getUserLoaded);
    this.loading$ = this.store.select(fromStore.getUserLoading);
    this.fails$ = this.store.select(fromStore.getUserFails);
    this.status$ = this.store.select(fromStore.getUserStatus);
    this.redirect$ = this.store.select(fromStore.getEntrypoint);
    this.loaded$.subscribe(loaded => (loaded === true ? this.Redirect() : null));
  }

  loginWQ(event) {
    const data: Login = event;
    this.store.dispatch(new fromStore.LoadLogin(data));
  }

  Redirect() {
    this.redirect$.subscribe(red => {
      // /catalog/category/doors/dover?tab=recessed&pc=5&wr=false

      const url = red.replace(/\%20/gi, ' ').replace(/\%25252520/gi, ' ');
      /* const params = url.split('?');
      let param;
      url = params[0];
      params.forEach((p, i) => {
        if (i === 0) return;
        const obj = p.split('&');
        obj.forEach(o => {
          let key = o.split('=');
          const value = key[1];
          key = key[0];
          param = { ...param, [key]: value };
        });
      });

      console.log('url: ' + url);
      console.log(param); */
      this.router.navigateByUrl(url);
    });
  }
}
