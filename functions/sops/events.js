'use strict';

// Firebase Setup
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Database access as admin
const db = admin.firestore();
const makeLink = require('../msc/link');

// Update happens on Update event
/* exports.update = functions.firestore.document('sops/{sopCatId}').onUpdate(async (snapshot, context) => {
    const docBefore = snapshot.before.data();
    const docAfter = snapshot.after.data();
    console.log({docBefore, docAfter, context});
}) */
// Remove happens on Delete event
/* exports.remove = functions.firestore.document('sops/{sopCatId}').onDelete(async (snapshot, context) => {
    const doc = snapshot.data();
    console.log({doc, context});
}) */
// Add happens on Create event
exports.add = functions.firestore.document('sops/{sopCatId}').onCreate(async (snapshot, context) => {
    const doc = snapshot.data();
    const defaultProps = {
        id: context.params.sopCatId,
        sub: 'main',
        link: makeLink(doc.title)
    }
    console.log({doc, context, defaultProps});
    const sopRef = db.doc(`sops/${context.params.sopCatId}`);
    return sopRef.update({...defaultProps})
})
exports.addSub = functions.firestore.document('sops/{sopCatId}/entities/{sopSubId}').onCreate( async (snapshot, context) => {
    const doc = snapshot.data();
    const defaultProps = {
        id: context.params.sopSubId,
        idCat: context.params.sopCatId,
        sub: '',
        link: makeLink(doc.title)
    }
    console.log({doc, context, defaultProps});
    const sopRef = db.doc(`sops/${context.params.sopCatId}/entities/${context.params.sopSubId}`);
    return sopRef.update({...defaultProps})
})
exports.addSubSub = functions.firestore.document('sops/{sopCatId}/entities/{sopSubId}/entities/{sopId}').onCreate( async (snapshot, context) => {
    const doc = snapshot.data();
    const defaultProps = {
        id: context.params.sopId,
        idSub: context.params.sopSubId,
        idCat: context.params.sopCatId,
        sub: '',
        subCat: '',
        link: makeLink(doc.title)
    }
    console.log({doc, context, defaultProps});
    const sopRef = db.doc(`sops/${context.params.sopCatId}/entities/${context.params.sopSubId}/entities/${context.params.sopId}`);
    return sopRef.update({...defaultProps})
})

// Write happens on all events, Create, Update, Delete
/* exports.write = functions.firestore.document('sops/{sopCatId}').onWrite(async (snapshot, context) => {
    const docBefore = snapshot.before.data();
    const docAfter = snapshot.after.data();
    console.log({docBefore, docAfter, context});
}) */