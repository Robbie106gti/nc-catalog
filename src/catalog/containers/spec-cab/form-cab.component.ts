import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { User } from '../../models/user.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-cab',
  // styleUrls: ['products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <edit-form-cab *ngIf="(toEdit$ | async) as edit" [user]="user" [edit]="edit" (close)="Close($event)"></edit-form-cab>
  `,
})
export class FormCabComponent {
  toEdit$: Observable<any>;
  @Input() user: any;
  @Output() close = new EventEmitter<boolean>();

  constructor(private store: Store<fromStore.ProductsState>) {
    this.toEdit$ = this.store.select(fromStore.getToEditCabinet);
  }

  Close(event) { this.close.emit(true); this.store.dispatch({type: fromStore.CREATE_EDIT_CAB_DEL}); }

}
