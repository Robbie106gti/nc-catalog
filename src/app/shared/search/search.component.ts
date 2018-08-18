import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.html',
  styleUrls: ['./search.scss']
})
export class SearchComponent {
  search$: Observable<any>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(private store: Store<fromStore.State>) {
    this.search$ = this.store.select(fromStore.getSearchResults);
    this.loading$ = this.store.select(fromStore.getSearchLoading);
    this.loaded$ = this.store.select(fromStore.getSearchLoaded);
  }

  Search(i) {
    this.store.dispatch({ type: fromStore.SEARCH, payload: i });
  }
}
