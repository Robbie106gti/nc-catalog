
import {tap, take, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable ,  of } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { WQUser, User } from '../models/user.model';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable()
export class FirestoreService {
  constructor(public afs: AngularFirestore) {}

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
      .snapshotChanges().pipe(
      map(doc => {
        return doc.payload.data() as T;
      }));
  }
  col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn)
      .snapshotChanges().pipe(
      map(docs => {
        return docs.map(a => a.payload.doc.data()) as T[];
      }));
  }
  /// with Ids
  colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<any[]> {
    // console.log(ref);
    return this.col(ref, queryFn)
      .snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
  }

  refreshCustomClaims(token) {
    return firebase
      .auth()
      .signInWithCustomToken(token)
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
      });
  }

  checkReady() {
    return firebase.auth().onAuthStateChanged(user => user.uid);
  }

  checkCustomClaims() {
    // firebase
    // .auth()
    // .currentUser.getIdToken(true)
    // .then(token => console.log(token));
    let callback = null;
    let metadataRef = null;
    firebase.auth().onAuthStateChanged(user => {
      // Remove previous listener.
      if (callback) {
        metadataRef.off('value', callback);
      }
      // On user login add new listener.
      if (user) {
        // Check if refresh is required.
        console.log(user);
        metadataRef = firebase
          .database()
          .ref('metadata/' + user.uid + '/refreshTime');
        callback = snapshot => {
          // Force refresh to pick up the latest custom claims changes.
          // Note this is always triggered on first call. Further optimization could be
          // added to avoid the initial trigger when the token is issued and already contains
          // the latest claims.
          console.log(snapshot);
          user.getIdToken(true);
        };
        // Subscribe new listener to changes on that node.
        metadataRef.on('value', callback);
      }
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
  delete<T>(ref: DocPredicate<T>) {
    return this.doc(ref).delete();
  }
  add<T>(ref: CollectionPredicate<T>, data) {
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
      .snapshotChanges().pipe(
      take(1))
      .toPromise();
    return doc.then(snap => {
      // console.log(snap.payload);
      return snap.payload.exists ? this.update(ref, data) : this.set(ref, data);
    });
  }
  /// If doc exists update, otherwise set
  exists<T>(ref: DocPredicate<T>) {
    // console.log(ref, data);
    return this.doc(ref).snapshotChanges();
  }

  trimit(str) {
    return str ? str.trim() : null;
  }
  /// **************
  /// Inspect Data
  /// **************
  inspectDoc(ref: DocPredicate<any>): void {
    const tick = new Date().getTime();
    this.doc(ref)
      .snapshotChanges().pipe(
      take(1),
      tap(d => {
        const tock = new Date().getTime() - tick;
        console.log(`Loaded Document in ${tock}ms`, d);
      }),)
      .subscribe();
  }
  inspectCol(ref: CollectionPredicate<any>): void {
    const tick = new Date().getTime();
    this.col(ref)
      .snapshotChanges().pipe(
      take(1),
      tap(c => {
        const tock = new Date().getTime() - tick;
        console.log(`Loaded Collection in ${tock}ms`, c);
      }),)
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
    return this.doc$(ref).pipe(map(doc => {
      for (const k of Object.keys(doc)) {
        if (doc[k] instanceof firebase.firestore.DocumentReference) {
          doc[k] = this.doc(doc[k].path);
        }
      }
      return doc;
    }));
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
