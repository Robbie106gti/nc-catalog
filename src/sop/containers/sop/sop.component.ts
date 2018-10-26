import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'sop',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sop.html'
})
export class SopComponent {
  sop$: Observable<any>;
  modal: {
    title: string;
    action: string;
    sop: any;
    edit?: any;
    newTitle?: string;
  };
  add: boolean;
  user$: Observable<any>;
  roles$: Observable<any>;
  icons$: Observable<any>;
  url$: Observable<string>;
  pct$: Observable<any>;
  file: any;

  constructor(private store: Store<fromStore.SopsState>) {
    this.user$ = this.store.select(fromStore.getUserName);
    this.roles$ = this.store.select(fromStore.getUserRoles);
    this.sop$ = this.store.select(fromStore.getSelectedSop);
    this.icons$ = this.store.select(fromStore.getIcons);
    this.url$ = this.store.select(fromStore.getUploadUrl);
    this.pct$ = this.store.select(fromStore.getUploadPercentage);
  }

  Menu(event, sop) {
    let edit;
    switch (event) {
      case 'Description': {
        sop.description = sop.description ? sop.description : { title: '', description: '' };
        edit = {
          title: sop.description.title,
          value: sop.description.description
        };
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
      case 'Image': {
        sop.images = sop.images ? sop.images : [];
        edit = { title: '', value: sop.images };
        break;
      }
      case 'Html': {
        sop.html = sop.html ? sop.html : {};
        edit = { value: sop.html };
        break;
      }
      default: {
        edit = { title: '', value: '' };
      }
    }
    this.modal = { title: `Add a ${event}`, action: event, sop: edit };
    this.add = true;
    // console.log(this.modal);
  }

  Images(event) {
    this.store.dispatch({
      type: fromStore.ADD_TO_SOP,
      payload: { ...event, action: 'Images' }
    });
  }

  NewList(event) {
    this.store.dispatch({
      type: fromStore.ADD_TO_SOP,
      payload: { ...event, action: 'List' }
    });
  }

  NewTable(event) {
    this.store.dispatch({
      type: fromStore.ADD_TO_SOP,
      payload: { ...event, action: 'Table' }
    });
  }

  TableRemove(event) {
    console.log(event);
  }

  NewTitle(event) {
    console.log(event);
    this.store.dispatch({
      type: fromStore.ADD_TO_SOP,
      payload: { ...event, action: 'ListTitle' }
    });
  }

  Notes(event) {
    console.log(event);
    this.store.dispatch({ type: fromStore.ADD_TO_SOP, payload: event });
  }

  Close(event) {
    this.add = false;
  }

  Add(event) {
    console.log(event);
    this.store.dispatch({ type: fromStore.ADD_TO_SOP, payload: event });
  }

  File(event) {
    this.file = event.file;
    this.store.dispatch(new fromStore.Upload(event));
  }

  ToHtml(event) {
    this.store.dispatch({ type: fromStore.ADD_TO_SOP, payload: event });
  }

  MainImage(event) {
    this.store.dispatch({ type: fromStore.ADD_TO_SOP, payload: event });
  }
}
