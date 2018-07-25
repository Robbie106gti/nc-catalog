import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, take } from 'rxjs/operators';
import { replace, split } from 'lodash';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromServices from '../../services';
import * as sopActions from '../actions';
import { Payload } from '../../models/payload.model';

@Injectable()
export class SopEffects {
  constructor(
    private store: Store<fromStore.SopsState>,
    private actions$: Actions,
    private firestore: fromServices.FirestoreService
  ) {}

  @Effect()
  load_sops$ = this.actions$.ofType(sopActions.LOAD_SOPS).pipe(
    switchMap((action: Payload) => {
      // console.log(action);
      this.store.dispatch({ type: fromStore.UPDATE_CAT_LOADING, payload: action.payload });
      return this.firestore.colWithIds$(`sops/${action.payload.id}/entities`).pipe(
        map(entities => {
          const item = entities.map(b => {
            return { ...b, sub: action.payload.title, idCat: action.payload.id };
          });
          this.store.dispatch({ type: fromStore.UPDATE_CAT_LOADED, payload: action.payload });
          return new sopActions.LoadSopsSuccess(item);
        }),
        catchError(error => of(new sopActions.LoadSopsFail(error)))
      );
    })
  );

  @Effect()
  add_sop$ = this.actions$.ofType(sopActions.ADD_SOP).pipe(
    switchMap((action: Payload) => {
      const cat = {
        title: action.payload.title,
        createdBy: action.payload.fullName,
        updatedBy: action.payload.fullName,
        image: action.payload.image,
        active: true,
        sort: 100
      };
      return this.store.select(fromStore.getSelectedCat).pipe(
        take(1),
        map(category => {
          this.firestore.add(`sops/${category.id}/entities`, cat);
          return new fromStore.AddSopSuccess({ category, cat });
        }),
        catchError(error => of(new fromStore.AddSopFail(error)))
      );
    })
  );

  @Effect()
  update_sop_ti$ = this.actions$.ofType(sopActions.UPDATE_SOP_TI).pipe(
    switchMap((action: Payload) => {
      return this.store.select(fromStore.getUploadUrl).pipe(
        take(1),
        map(url => {
          console.log(action.payload, url);
          let cat;
          if (action.payload.remove) {
            this.firestore.delete(`sops/${action.payload.edit.idCat}/entities/${action.payload.edit.id}`);
            cat = 'removed';
          } else {
            cat = {
              title: action.payload.titleNew,
              updatedBy: action.payload.fullName,
              image: action.payload.imageNew
            };
            this.firestore.update(`sops/${action.payload.edit.idCat}/entities/${action.payload.edit.id}`, cat);
          }
          return new fromStore.UpdateSopTIsuccess({ ...cat, edit: action.payload.edit });
        }),
        catchError(error => of(new fromStore.UpdateSopTIfail(error)))
      );
    })
  );

  @Effect()
  add_to_sop$ = this.actions$.ofType(sopActions.ADD_TO_SOP).pipe(
    switchMap((action: Payload) => {
      return this.store.select(fromStore.getSelectedSop).pipe(
        take(1),
        map(sop => {
          console.log(action.payload, sop);
          let value;
          let key;
          const user = action.payload.fullName;
          switch (action.payload.action) {
            case 'Description': {
              key = action.payload.action.toLowerCase();
              value = { [key]: action.payload.edit, title: action.payload.newTitle };
              break;
            }
            case 'List': {
              key = action.payload.action.toLowerCase();
              value = action.payload.list;
              break;
            }
            case 'ListTitle': {
              key = 'listTitle';
              value = action.payload.listTitle;
              break;
            }
            case 'Table': {
              key = 'table';
              value = action.payload.table;
              break;
            }
            case 'Notes': {
              key = action.payload.action.toLowerCase();
              value = action.payload.notes;
              break;
            }
            case 'Images': {
              key = action.payload.action.toLowerCase();
              value = action.payload.images;
              break;
            }
            case 'Html': {
              key = action.payload.action.toLowerCase();
              value = action.payload.value;
              value = this.cleanupHtml(value);
              break;
            }
          }
          console.log(sop.idCat, sop.id, key, value);
          this.firestore.update(`sops/${sop.idCat}/entities/${sop.id}`, { [key]: value, updatedBy: user });
          return new fromStore.AddToSopSuccess({ [key]: value, edit: sop, user });
        }),
        catchError(error => of(new fromStore.AddToSopFail(error)))
      );
    })
  );

  cleanupHtml(value) {
    trysomthing(value);

    value = value
      .replace(/<section>/gi, '<div class="card">')
      .replace(/<\/section>/gi, '</div>')
      .replace(/<section class="card">/gi, '<div class="card">');
    const arr = value.split('<div class="card">');
    const fireArr = new Array();
    arr.forEach(el => {
      el = this.cleanupEl(el);
      if (el.length < 1) return;
      el = el
        .replace(/<ul>↵            <li>/gi, '<ul class="collection with-header"><li class="collection-header">')
        .replace(/<ul>/gi, '<ul class="collection">')
        .replace(/<li>/gi, '<li class="collection-item">')
        .replace(/<table/gi, '<table class="striped highlight"');
      fireArr.push(`<section>${el}</section><div class="divider"></div>`);
    });
    console.log(fireArr);
    return { sections: fireArr, plain: value };
  }

  cleanupEl(el) {
    el = el.trim();
    el = el
      .replace(/lang="en-US"/gi, '')
      .replace(/align="center"/gi, '')
      .replace(/align="right"/gi, '')
      .replace(/<section>/gi, '')
      .replace(/<\/div>/gi, '')
      .replace(/↵            /gi, '')
      .replace(/<\/section>/gi, '');
    return el;
  }

  trysomething(str) {
    // https://docs.microsoft.com/en-us/dotnet/standard/base-types/grouping-constructs-in-regular-expressions#zerowidth_positive_lookahead_assertion
    // https://www.w3schools.com/jsref/jsref_obj_regexp.asp
    console.log(str);
  }
}
