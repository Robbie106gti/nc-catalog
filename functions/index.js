'use strict';


var admin = require('firebase-admin');
const serviceAccount = require('./nickels-catalog-firebase-adminsdk-m8g1g-600cf4ab30.json');
// Updated to V2 firebase-functions, if errors see this https://firebase.google.com/docs/functions/beta-v1-diff
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nickels-catalog.firebaseio.com'
});

// Database access as admin
var db = admin.database();

// We use Request to make the basic authentication request in our example.
var basicAuthRequest = require('request');

const login = require('./auth/login');
const SopEvents = require('./sops/events');

exports.auth = login;
exports.sop = SopEvents;
