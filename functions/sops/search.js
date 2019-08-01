'use strict';

// Firebase Setup
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Database access as admin
const db = admin.database();

// export const update = functions.
exports.update = functions.firestore.document('sops/{sopCatId}').onUpdate(async (snapshot, context) => {
    const doc = snapshot.data();
    console.log(doc)
})
// export const remove = functions.
// export const add = functions.