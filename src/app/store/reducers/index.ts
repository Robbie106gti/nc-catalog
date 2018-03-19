import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params,
} from '@angular/router';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';
import * as fromLogin from './login.reducer';
import * as fromSearch from './search.reducer';
import * as fromIcons from './icons.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  user: fromLogin.UserState;
  search: fromSearch.SearchState;
  icons: fromIcons.IconState;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
  user: fromLogin.reducer,
  search: fromSearch.reducer,
  icons: fromIcons.reducer
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');
export const getUser = createFeatureSelector<fromLogin.UserState>('user');
export const getSearch = createFeatureSelector<fromSearch.SearchState>('search');
export const getIcons = createFeatureSelector<fromSearch.SearchState>('icons');

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;
      return { url, queryParams, params };
  }
}
