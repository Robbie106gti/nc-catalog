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
          // console.log(action.payload, sop);
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
            case 'imageimportant': {
              key = action.payload.action.toLowerCase();
              value = action.payload.value;
              break;
            }
          }
          // console.log(sop.idCat, sop.id, key, value);
          this.firestore.update(`sops/${sop.idCat}/entities/${sop.id}`, { [key]: value, updatedBy: user });
          return new fromStore.AddToSopSuccess({ [key]: value, edit: sop, user });
        }),
        catchError(error => of(new fromStore.AddToSopFail(error)))
      );
    })
  );

  cleanupHtml(str) {
    const newstr = str
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/>\s</g, '><')
      .replace(/<div class="card">/g, '<section>')
      .replace(/<section(.*?)>/g, '<section>');
    const html = { newstr, strDivArr: [], strDSArr: [], newHtml: '', newHtmlArr: [] };
    html.strDivArr = newstr.split(/<section>/g);
    html.strDivArr.forEach(sec => (sec !== '' ? html.strDSArr.push(sec) : null));
    html.strDSArr.forEach(sec => {
      const newsec = this.fixStr(sec);
      newsec !== '' ? html.newHtmlArr.push(newsec) : null;
    });
    return { sections: html.newHtmlArr, plain: str };
  }

  fixStr(str) {
    str = str.trim().replace(/<section *>/, '');
    str = str
      .replace(/<\/section>*$/, '')
      .replace(/<\/div>*$/, '')
      .trim();

    const divCount = str.split(/<div(.*?)>/).length - 1;
    const divcCount = str.split(/<\/div>/).length - 1;
    if (divCount !== divcCount) {
      const times = divcCount - divCount;
      let i;
      for (i = 0; i < times; i++) {
        str = str.replace(/<\/div>$/, '');
      }
    }
    str = str.match(/<!--/) ? str.replace(/<!--(.*?)-->/, '') : str;
    str = str.match(/<ul/) ? this.listMarkUp(str) : str;
    str = str.match(/<table/) ? this.tablesMarkUp(str) : str;
    // console.log(str);
    return str;
  }

  listMarkUp(str) {
    str = str.replace(/<li(.*?)>/gi, '<li class="collection-item">');
    const initLists = str.split(/<ul *>/g);
    const list = new Array();
    const list2 = new Array();
    initLists.forEach(lis => {
      if (lis === '') return;
      lis = lis.match(/<\/li>/) ? `<ul class="collection with-header">${lis}` : lis;
      list.push(lis);
    });
    list.forEach((ul, index) => {
      index = index === 0 ? 1 : index;
      const f10 = list[index - 1].substring(list[index - 1].length - 13);
      ul = f10.match(/<\/h/) ? ul : ul.replace(/<li class="collection-item">/i, '<li class="collection-header">');
      list2.push(ul);
    });
    str = list2.join('');
    return str;
  }

  tablesMarkUp(str) {
    const tables = { start: [], cleaned: [], str: '' };
    tables.start = str.split(/<table/);
    tables.start.forEach(tab => {
      if (tab === '') return;
      console.log(tab);
      tab = tab.match(/<tr/) ? `<table class="striped highlight responsive-table" ${tab}` : tab;
      if (tab.match(/<th/) && !tab.match(/<theader/)) {
        const table = { tbody: [], trs: [], newtrs: [], newTableArr: [], newTable: '' };
        table.tbody = tab.split(/<tbody *>/);
        table.trs = table.tbody[1].split(/<tr/);
        table.trs.forEach(tr => {
          if (tr === '') return;
          tr = tr.match(/<th/) ? `<theader><tr${tr}</theader><tbody>` : `<tr${tr}`;
          table.newtrs.push(tr);
        });
        table.newTableArr.push(table.tbody[0]);
        table.newtrs.forEach(tr => table.newTableArr.push(tr));
        table.newTable = table.newTableArr.join('');
        console.log(table);
        tab = table.newTable;
      }
      tables.cleaned.push(tab);
    });
    tables.str = tables.cleaned.join('');
    // console.log(tables);
    return tables.str;
  }
}
