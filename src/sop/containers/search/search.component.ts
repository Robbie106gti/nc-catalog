import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';

@Component({
  selector: 'search-sop',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="top">
  <div class="row">
    <form class="input-field col s6 push-s3 white-text">
      <i class="material-icons prefix">search</i>
      <input id="search" type="text" class="validate white-text" sopAutofocus required #search (keyup.enter)="Search(search.value)">
      <label for="icon_prefix">Search</label>
    </form>
  </div>
</div>
<sop-spinner [loading]="(loading$ | async)"></sop-spinner>
<sop-results [search]="search.value" [loaded]="(loaded$ | async)" [loading]="(loading$ | async)" [results]="(results$ | async)"></sop-results>
`,
  styleUrls: ['./search.scss']
})
export class SearchComponent {
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  results$: Observable<any>;
  constructor(private store: Store<fromStore.SopsState>) {
    this.loading$ = this.store.select(fromStore.getSearchLoading);
    this.loaded$ = this.store.select(fromStore.getSearchLoaded);
    this.results$ = this.store.select(fromStore.getSearchResults);
  }
  Search(value) {
    this.store.dispatch({ type: fromStore.SEARCH_SOP, payload: value });
  }
}
