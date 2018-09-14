import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable()
export class FirestoreService {
  constructor(public afs: AngularFirestore, private store: Store<fromStore.SopsState>) {}

  /// **************
  /// Get a Reference
  /// **************
  col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
  }
  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
  }
  /// **************
  /// Get Data
  /// **************
  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref)
      .snapshotChanges()
      .map(doc => {
        return doc.payload.data() as T;
      });
  }
  col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .map(docs => {
        return docs.map(a => a.payload.doc.data()) as T[];
      });
  }
  /// with Ids
  colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<any[]> {
    // console.log(ref);
    return this.col(ref, queryFn)
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
  }
  /// **************
  /// Write Data
  /// **************
  /// Firebase Server Timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
  set<T>(ref: DocPredicate<T>, data: any) {
    const timestamp = this.timestamp;
    // console.log(ref, data);
    return this.doc(ref).set({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    });
  }
  update<T>(ref: DocPredicate<T>, data: any) {
    // console.log(ref, data);
    return this.doc(ref).update({
      ...data,
      updatedAt: this.timestamp
    });
  }
  setUser<T>(ref: DocPredicate<T>, data: any) {
    const timestamp = this.timestamp;
    // console.log(ref, data);
    return this.doc(ref).set({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    });
  }
  updateUser<T>(ref: DocPredicate<T>, data: any) {
    return this.doc(ref).update({
      ...data,
      updatedAt: this.timestamp
    });
  }
  delete<T>(ref: DocPredicate<T>) {
    return this.doc(ref).delete();
  }
  add<T>(ref: CollectionPredicate<T>, data) {
    console.log(data);
    const timestamp = this.timestamp;
    return this.col(ref).add({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    });
  }
  geopoint(lat: number, lng: number) {
    return new firebase.firestore.GeoPoint(lat, lng);
  }
  /// If doc exists update, otherwise set
  upsert<T>(ref: DocPredicate<T>, data: any) {
    // console.log(ref, data);
    const doc = this.doc(ref)
      .snapshotChanges()
      .take(1)
      .toPromise();
    return doc.then(snap => {
      // console.log(snap.payload);
      return snap.payload.exists ? this.update(ref, data) : this.set(ref, data);
    });
  }
  /// If doc exists update, otherwise set
  upsertUser<T>(ref: DocPredicate<T>, data: any) {
    // console.log(ref, data);
    const doc = this.doc(ref)
      .snapshotChanges()
      .take(1)
      .toPromise();
    return doc
      .then(snap => {
        console.log(snap.payload);
        return snap.payload.exists ? this.updateUser(ref, data) : this.setUser(ref, data);
      })
      .then(() => setTimeout(() => location.reload(), 1000));
  }
  /// **************
  /// Inspect Data
  /// **************
  inspectDoc(ref: DocPredicate<any>): void {
    const tick = new Date().getTime();
    this.doc(ref)
      .snapshotChanges()
      .take(1)
      .do(d => {
        const tock = new Date().getTime() - tick;
        console.log(`Loaded Document in ${tock}ms`, d);
      })
      .subscribe();
  }
  inspectCol(ref: CollectionPredicate<any>): void {
    const tick = new Date().getTime();
    this.col(ref)
      .snapshotChanges()
      .take(1)
      .do(c => {
        const tock = new Date().getTime() - tick;
        console.log(`Loaded Collection in ${tock}ms`, c);
      })
      .subscribe();
  }
  /// **************
  /// Create and read doc references
  /// **************
  /// create a reference between two documents
  connect(host: DocPredicate<any>, key: string, doc: DocPredicate<any>) {
    return this.doc(host).update({ [key]: this.doc(doc).ref });
  }
  /// returns a documents references mapped to AngularFirestoreDocument
  docWithRefs$<T>(ref: DocPredicate<T>) {
    return this.doc$(ref).map(doc => {
      for (const k of Object.keys(doc)) {
        if (doc[k] instanceof firebase.firestore.DocumentReference) {
          doc[k] = this.doc(doc[k].path);
        }
      }
      return doc;
    });
  }
  /// **************
  /// Atomic batch example
  /// **************
  /// Just an example, you will need to customize this method.
  atomic() {
    const batch = firebase.firestore().batch();
    /// add your operations here
    const itemDoc = firebase.firestore().doc('items/myCoolItem');
    const userDoc = firebase.firestore().doc('users/userId');
    const currentTime = this.timestamp;
    batch.update(itemDoc, { timestamp: currentTime });
    batch.update(userDoc, { timestamp: currentTime });
    /// commit operations
    return batch.commit();
  }
}
