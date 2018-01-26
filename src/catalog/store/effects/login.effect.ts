import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as loginActions from '../actions/login.action';
import * as fromServices from '../../services';
import { User, WQUser } from '../../models/user.model';
import { Login } from '../../models/login.model';

export interface Ap {
  type: string;
  payload: WQUser;
}

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private firestoreService: fromServices.FirestoreService,
    private store: Store<fromStore.ProductsState>
  ) {}

  @Effect()
  loadLogin$ = this.actions$.ofType(loginActions.LOAD_LOGIN).pipe(
    map(login => {
      // console.log(login);
      const user: WQUser = {
        token: 'eyJhbGciOiJS',
        valid: {
        DealerAddress1: '6760 Graybar Rd',
        DealerAddress2: 'Richmond',
        DealerAddress3: 'BC',
        DealerID: 'NICKELSM',
        DealerName: 'NICKELS CABINETS (MANUFACTURER)',
        DealerPostalCode: 'V6W1J1',
        DisplayName: 'Robert                   ',
        Email: 'rob@nickelscabinets.com',
        FirstName: 'Robert                        ',
        LastName: 'Leeuwerink                    ',
        UserName: 'ROBERT  '
        }
      };
      return new loginActions.LoadLoginFb(user); }
    ),
    catchError(error => of(new loginActions.LoadLoginFail(error)) )
    );

  @Effect()
  loadLoginFb$ = this.actions$.ofType(loginActions.LOAD_LOGIN_FB).pipe(
    switchMap((action: Ap) => {
      return this.firestoreService
        .docWithRefs$(`users/${action.payload.valid.Email}`)
        .pipe(
          map((userfb: User) => {
            return new loginActions.LoadLoginFbSuccess({...userfb, wqData: action.payload });
          }),
          catchError(error => of(new loginActions.LoadLoginFbFail(error)))
        );
    })
  );

  compare(user, wq) {
    wq.valid.DisplayName = wq.valid.DisplayName.trim();
    wq.valid.FirstName = wq.valid.FirstName.trim();
    wq.valid.LastName = wq.valid.LastName.trim();
    wq.valid.UserName = wq.valid.UserName.trim();
    let firstName;
    let lastName;
    let fullName;
    let displayName;
    let dealerID;
    let dealerName;
    let email;
    let street;
    let city;
    let state;
    let postcode;
    if (user.firstName === wq.valid.FirstName) {
      console.log(user.firstName, wq.valid.FirstName);
      firstName = wq.valid.FirstName;
      fullName = wq.valid.FirstName + ' ' + wq.valid.LastName;
    }
    if (user.lastName === wq.valid.LastName) {
      console.log(user.lastName, wq.valid.LastName);
      lastName = wq.valid.LastName;
      fullName = wq.valid.FirstName + ' ' + wq.valid.LastName;
    }
    if (user.displayName === wq.valid.DisplayName) {
      console.log(user.displayName, wq.valid.DisplayName);
      displayName = wq.valid.DisplayName;
    }
    if (user.dealerID === wq.valid.DealerID) {
      console.log(user.dealerID, wq.valid.DealerID);
      dealerID = wq.valid.DealerID;
    }
    if (user.dealerName === wq.valid.DealerName) {
      console.log(user.dealerName, wq.valid.DealerName);
      dealerName = wq.valid.DealerName;
    }
    if (user.dealerName === wq.valid.DealerName) {
      console.log(user.dealerName, wq.valid.DealerName);
      dealerName = wq.valid.DealerName;
    }
    if (user.email === wq.valid.Email) {
      console.log(user.dealerName, wq.valid.Email);
      email = wq.valid.Email;
    }
    if (user.address.street === wq.valid.DealerAddress1) {
      console.log(wq.valid.DealerAddress1);
      street = wq.valid.DealerAddress1;
    }
    if (user.address.city === wq.valid.DealerAddress2) {
      console.log(wq.valid.DealerAddress2);
      city = wq.valid.DealerAddress2;
    }
    if (user.address.state === wq.valid.DealerAddress3) {
      console.log(wq.valid.DealerAddress3);
      state = wq.valid.DealerAddress3;
    }
    if (user.address.postcode === wq.valid.DealerPostalCode) {
      console.log(wq.valid.DealerPostalCode);
      postcode = wq.valid.DealerPostalCode;
    }
  }

}
