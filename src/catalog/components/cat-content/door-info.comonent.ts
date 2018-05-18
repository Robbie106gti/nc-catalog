import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';

@Component({
  selector: 'door-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './door-info.html'
})
export class DoorInfoComponent {
  @Input() content: any;
  @Input() user: any;
  images$: Observable<any>;
  @Input() version$: Observable<any>;
  modal$: Observable<boolean>;

  constructor(private store: Store<fromStore.ProductsState>) {
    this.images$ = this.store.select(fromStore.catagoryImages);
    this.modal$ = this.store.select(fromStore.getModalState);
  }
}
