import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="container" *ngIf="(user$ | async ) as user">
  <div class="card horizontal">
    <div class="card-image">
      <img *ngIf="user.image" src="https://lorempixel.com/100/190/nature/6">
      <i class="material-icons large" *ngIf="!user.image">assignment_ind</i>
    </div>
    <div class="card-stacked">
      <div class="card-content row">
        <h4>{{ user.fullName }} - {{ user.status }}</h4>
        <div class="col s4">
          <ul class="collection">
            <li class="collection-item">
              <b>Sign-up : </b> {{ user.createdAt | date }}</li>
            <li class="collection-item">
              <b>Updated last : </b> {{ user.updatedAt | date }}</li>
            <li class="divider"></li>
            <li class="collection-item">
              <b>First name : </b> {{ user.firstName }}</li>
            <li class="collection-item">
              <b>Last name : </b> {{ user.lastName }}</li>
            <li class="collection-item">
              <b>E-mail : </b> {{ user.email }}</li>
          </ul>
        </div>
        <div class="col s4">
          <ul class="collection with-header">
            <li class="collection-header">
              <b>Dealer name : </b>
              <br>{{ user.dealerName }}</li>
            <li class="divider"></li>
            <li class="collection-item">
              <b>Dealer address : </b>
            </li>
            <li class="collection-item">
              <b>Street : </b> {{ user.wqData.DealerAddress1 }}</li>
            <li class="collection-item">
              <b>City : </b> {{ user.wqData.DealerAddress2 }}</li>
            <li class="collection-item">
              <b>State, Zipcode : </b> {{ user.wqData.DealerAddress3 }}, {{ user.wqData.DealerPostalCode }}</li>
          </ul>
        </div>
        <div class="col s4">
          <ul class="collection with-header">
            <li class="collection-header">
              <b>Roles </b>
            </li>
            <li class="divider"></li>
            <li class="collection-item" *ngIf="!user.roles.dealer">
              <b>Admin : </b> {{ user.roles.admin }}</li>
            <li class="collection-item" *ngIf="!user.roles.dealer">
              <b>Editor : </b> {{ user.roles.editor }}</li>
            <li class="collection-item" *ngIf="!user.roles.dealer">
              <b>Nickels : </b> {{ user.roles.nickels }}</li>
            <li class="collection-item">
              <b>Reader : </b> {{ user.roles.reader }}</li>
            <li class="collection-item" *ngIf="!user.roles.dealer">
              <b>SOP : </b> {{ user.roles.sop }}</li>
            <li class="collection-item">
              <b>Dealer : </b> {{ user.roles.dealer }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
  <div class="card-panel col s6">
  <h4>Favorites</h4>
  <div *ngFor="let fav of favorites$ | async">{{fav | json}}</div>

  </div>
  <div class="card-panel col s6">
  <h4>Notes</h4>
  <div *ngFor="let note of notes$ | async">{{note | json}}</div>
  </div>
  </div>
</div>
  `
})
export class ProfileComponent {
  user$: Observable<any>;
  favorites$: Observable<any>;
  notes$: Observable<any>;

  constructor(private store: Store<fromStore.State>) {
    this.user$ = this.store.select(fromStore.getUserData);
    this.favorites$ = this.store.select(fromStore.getUserFavs);
    this.notes$ = this.store.select(fromStore.getUserNotes);
  }
}
