import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { of } from 'rxjs/observable/of';

@Component({
selector: 'sop',
changeDetection: ChangeDetectionStrategy.OnPush,
templateUrl: './sop.html',
})
export class SopComponent {
  sop$: Observable<any>;
  modal: { title: string, action: string, sop: any, edit?: any, newTitle?: string };
  add: boolean;
  user$: Observable<string>;
  icons$: Observable<any>;

  constructor(private store: Store<fromStore.SopsState>) {
    this.user$ = this.store.select(fromStore.getUserName);
    this.sop$ = this.store.select(fromStore.getSelectedSop);
    this.icons$ = this.store.select(fromStore.getIcons);
  }

  Menu(event, sop) {
    let edit;
    switch (event) {
      case 'Description': {
        sop.description = sop.description ? sop.description : { title: '', description: ''};
        edit = { title: sop.description.title, value: sop.description.description };
        break;
      }
      case 'Note': {
        sop.notes = sop.notes ? sop.notes : [];
        edit = { title: '', value: sop.notes };
        break;
      }
      case 'List': {
        sop.listTitle = sop.listTitle ? sop.listTitle : '';
        sop.list = sop.list ? sop.list : [];
        edit = { title: sop.listTitle, value: sop.list };
        break;
      }
      default: {
        edit = { title: '', value: '' };
      }
    }
    this.modal = { title: `Add a ${event}`, action: event, sop: edit };
    this.add = true;
    console.log(this.modal);
  }

  Close(event) {
    this.add = false;
  }

  Add(event) {
    this.store.dispatch({type: fromStore.ADD_TO_SOP, payload: event });
  }
}
