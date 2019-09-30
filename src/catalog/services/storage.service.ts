
import {take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';

type CollectionPredicate<T>   = string |  AngularFirestoreCollection<T>;
type DocPredicate<T>          = string |  AngularFirestoreDocument<T>;

@Injectable()
export class StorageService {
    task: AngularFireUploadTask;

  constructor(public afs: AngularFirestore, private store: Store<fromStore.ProductsState>, private storage: AngularFireStorage) { }

  uploadCab (event) {
    // console.log(event);
    const file = event.file;
    const cat = event.item.content.cabinet ? 'cabinets' : 'category';
    const newFileName = `${new Date().getTime()}_${event.type}_${file.name}`;
    // The storage path
    const path = `${cat}/${event.item.content.sub}/${event.item.content.title}/${newFileName}`;
    // Totally optional metadata
    const customMetadata = {
      uploadBy: event.user.fullName, title: event.item.content.title, cat, subcategory: event.item.content.sub, type: event.type, id: event.item.content.id, version: event.version
     };
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
    // Progress monitoring
    const snap = this.task.snapshotChanges();
    this.task.downloadURL().pipe(take(1)).subscribe(url => this.store.dispatch({ type: fromStore.DOWNLOAD_URL, payload: { url, ...event, newFileName, path, customMetadata}}));
    // this.store.dispatch({ type: fromStore.UPLOAD_CABINET, payload: snap});
    return snap;
  }

}
