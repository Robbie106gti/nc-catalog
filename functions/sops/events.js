'use strict';

// Firebase Setup
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Database access as admin
const db = admin.firestore();
const makeLink = require('../msc/link');
const updateItem = require('../msc/updateItem');
const sql = require('./sqlsearch');

// Update happens on Update event
exports.update = functions.firestore.document('sops/{sopCatId}').onUpdate(async (snapshot, context) => {
    const docBefore = snapshot.before.data();
    const docAfter = snapshot.after.data();
    if (docBefore.title === docAfter.title || docBefore.image === docAfter.image) {
      console.log('title and/or image is equal!')
      return null;
    }
    // console.log({docBefore, docAfter, context});
    const sqlsearch = await sql.mysqlUpdateSearch(docAfter);
    // console.log(sqlsearch);
    const sopCatRef = db.doc(`sops/${docAfter.id}`);
    const link = makeLink(docAfter.title);
    const search = docAfter.search ? docAfter.search.map(async s => {
      s = {...s, sub: link};
      const search = await sql.mysqlUpdateSearch(s);
      return s;
    }): [];
    const data = {
      link,
      search,
      sub: 'main',
      type: 'sop'
    }
    return sopCatRef.update({
      ...data
    });

})
exports.updateSubSearch = functions.firestore
  .document('sops/{sopCatId}/entities/{sopSubId}')
  .onUpdate(async (snapshot, context) => {
    const docAfter = snapshot.after.data();
    const sopCatRef = db.doc(`sops/${context.params.sopCatId}`);
    const sopCatSnap = await sopCatRef.get();
    const sopCatData = await sopCatSnap.data();
    const item = await updateItem(docAfter, context);
    const sub = makeLink(sopCatData.title);
    const newSearch = {};
    sopCatData.search.forEach(item => newSearch[item.id] = { ...item, sub });
    newSearch[item.id] = { ...item, sub };
    const search = Object.values(newSearch)
    // console.log({ item: { title: docAfter.title, cat: sopCatData.title }, context })
    const sqlsearch = await sql.mysqlUpdateSearch(newSearch[item.id]);
    // console.log(sqlsearch);
    return sopCatRef.update({
      search
    });
  });
// Remove happens on Delete event
exports.remove = functions.firestore.document('sops/{sopCatId}').onDelete(async (snapshot, context) => {
    const doc = snapshot.data();
    console.log({doc, context});
    await sql.deleteMySqlData(doc.id);
    return null;
})
exports.removeSubSearch = functions.firestore.document('sops/{sopCatId}/entities/{sopSubId}').onDelete(async (snapshot, context) => {
  const doc = snapshot.data();
  const sopCatRef = db.doc(`sops/${context.params.sopCatId}`);
  const sopCatSnap = await sopCatRef.get();
  const sopCatData = await sopCatSnap.data();
  const sub = makeLink(sopCatData.title);
  const newSearch = {};
  sopCatData.search.forEach(item => newSearch[item.id] = { ...item, sub });
  delete newSearch[context.params.sopSubId];
  const search = Object.values(newSearch);
  await sql.deleteMySqlData(context.params.sopSubId);
  console.log({ item: { title: doc.title, cat: sopCatData.title, sub }, context })
  return sopCatRef.update({
    search
  });
})
/* exports.removeSubHistroy = functions.firestore.document('sops/{sopCatId}/entities/{sopSubId}').onDelete(async (snapshot, context) => {
    const doc = snapshot.data();
    const sopCatRef = db.doc(`sops/${context.params.sopCatId}`);
    console.log({doc, context});
    let search = sopCatData.search.filter(item => item.id !== context.params.sopSubId);
    console.log({item: { title: doc.title, cat: doc.sub}, context})
    return sopCatRef.update({
      search
    });
}) */
// Add happens on Create event
exports.add = functions.firestore.document('sops/{sopCatId}').onCreate(async (snapshot, context) => {
  const doc = snapshot.data();
  const defaultProps = {
    id: context.params.sopCatId,
    sub: 'main',
    link: makeLink(doc.title)
  };
  const sqlsearch = await sql.mysqlUpdateSearch({...doc, ...defaultProps});
  // console.log(sqlsearch);
  console.log({ doc, context, defaultProps });
  const sopCatRef = db.doc(`sops/${context.params.sopCatId}`);
  return sopCatRef.update({ ...defaultProps });
});
exports.addSub = functions.firestore
  .document('sops/{sopCatId}/entities/{sopSubId}')
  .onCreate(async (snapshot, context) => {
    const doc = snapshot.data();
    const sopCatRef = db.doc(`sops/${context.params.sopCatId}`);
    const sopCatSnap = await sopCatRef.get();
    const sopCatData = await sopCatSnap.data();
    const defaultProps = {
      id: context.params.sopSubId,
      idCat: context.params.sopCatId,
      sub: makeLink(sopCatData.title),
      link: makeLink(doc.title)
    };
    console.log({ doc, context, defaultProps });
    const sopRef = db.doc(`sops/${context.params.sopCatId}/entities/${context.params.sopSubId}`);
    return sopRef.update({ ...defaultProps });
  });
exports.addSubSearch = functions.firestore
  .document('sops/{sopCatId}/entities/{sopSubId}')
  .onCreate(async (snapshot, context) => {
    const doc = snapshot.data();
    const sopCatRef = db.doc(`sops/${context.params.sopCatId}`);
    const sopCatSnap = await sopCatRef.get();
    const sopCatData = await sopCatSnap.data();
    const item = await updateItem(doc, context);
    item.sub = makeLink(sopCatData.title);
    return sopCatRef.update({
      search: admin.firestore.FieldValue.arrayUnion(item)
    });
  });
exports.addSubSub = functions.firestore
  .document('sops/{sopCatId}/entities/{sopSubId}/entities/{sopId}')
  .onCreate(async (snapshot, context) => {
    const doc = snapshot.data();
    const sopCatRef = db.doc(`sops/${context.params.sopCatId}`);
    const sopCatSnap = await sopCatRef.get();
    const sopCatData = await sopCatSnap.data();
    const sopSubRef = db.doc(`sops/${context.params.sopCatId}/entities/${sopSubId}`);
    const sopSubSnap = await sopSubRef.get();
    const sopSubData = await sopSubSnap.data();
    const defaultProps = {
      id: context.params.sopId,
      idSub: context.params.sopSubId,
      idCat: context.params.sopCatId,
      sub: makeLink(sopCatData.title),
      subCat: makeLink(sopSubData.title),
      link: makeLink(doc.title)
    };
    console.log({ doc, context, defaultProps });
    const sopRef = db.doc(
      `sops/${context.params.sopCatId}/entities/${context.params.sopSubId}/entities/${context.params.sopId}`
    );
    return sopRef.update({ ...defaultProps });
  });

// Write happens on all events, Create, Update, Delete
/* exports.write = functions.firestore.document('sops/{sopCatId}').onWrite(async (snapshot, context) => {
    const docBefore = snapshot.before.data();
    const docAfter = snapshot.after.data();
    console.log({docBefore, docAfter, context});
}) */
