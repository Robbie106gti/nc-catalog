import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="row grid">
  <app-user *ngFor="let user of users$ | async" [user]="user" (updatedUser)="updatedUser($event)"></app-user>
  </div>
  `
})
export class UsersComponent implements OnInit {
  users$: Observable<any>;

  constructor(private store: Store<fromStore.State>) {
    this.store.dispatch({ type: fromStore.USERS });
  }

  ngOnInit() {
    this.users$ = this.store.select(fromStore.getUsers);
  }

  updatedUser(event) {
    console.log(event);
  }
}
