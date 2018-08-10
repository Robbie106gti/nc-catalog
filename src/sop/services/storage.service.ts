import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';

@Injectable()
export class StorageService {
  task: AngularFireUploadTask;

  constructor(
    public afs: AngularFirestore,
    private store: Store<fromStore.SopsState>,
    private storage: AngularFireStorage
  ) {}

  upload(event) {
    console.log(event);
    const file = event.file;
    const newFileName = event.file.replace ? file.name : `${new Date().getTime()}_${file.name}`;
    // The storage path
    const path = event.edit ? `sop/${event.edit.sub}/${newFileName}` : `sop${event.dir}/${newFileName}`;
    // Totally optional metadata
    const customMetadata = {
      uploadBy: event.fullName,
      title: file.name,
      newTitle: newFileName
    };
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
    // Progress monitoring
    const snap = this.task.snapshotChanges();
    this.task
      .downloadURL()
      .take(1)
      .subscribe(url =>
        this.store.dispatch({
          type: fromStore.UPLOAD_URL_SUCCESS,
          payload: { url, ...event, newFileName, path, customMetadata }
        })
      );
    return snap;
  }
}
