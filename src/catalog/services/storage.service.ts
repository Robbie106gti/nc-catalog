import { Injectable } from '@angular/core';
import { AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';

type CollectionPredicate<T>   = string |  AngularFirestoreCollection<T>;
type DocPredicate<T>          = string |  AngularFirestoreDocument<T>;

@Injectable()
export class StorageService {
    task: AngularFireUploadTask;
    snapshot: Observable<any>;

  constructor(public afs: AngularFirestore, private store: Store<fromStore.ProductsState>, private storage: AngularFireStorage) { }

  uploadCab (event) {
      console.log(event);
    const file = event.file;
    const cat = event.item.content.cabinet ? 'cabinets' : 'category';
    // The storage path
    const path = `${cat}/${event.item.content.sub}/${event.item.content.title}/${new Date().getTime()}_${event.type}_${file.name}`;
    // Totally optional metadata
    const customMetadata = {
      uploadBy: event.user.fullName, title: event.item.content.title, cat, subcategory: event.item.content.sub, type: event.type
     };
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
    // Progress monitoring
    this.snapshot = this.task.snapshotChanges();
    return this.snapshot;
  }
}
