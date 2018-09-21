'use strict';
// Sample trigger function that copies new Firebase data to a Google Sheet

// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({
  origin: true
});

// Firebase Setup
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const serviceAccount = require('../nickels-catalog-firebase-adminsdk-m8g1g-600cf4ab30.json');
// Updated to V2 firebase-functions, if errors see this https://firebase.google.com/docs/functions/beta-v1-diff
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nickels-catalog.firebaseio.com'
});

// Database access as admin
const db = admin.database();

// We use Request to make the basic authentication request in our example.
const basicAuthRequest = require('request');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// https://firebase.google.com/docs/auth/admin/custom-claims
// exports.helloWorld = functions.https.onRequest((req, res) => {
//   res.send("Hello from Firebase!");
//  });

// Sources
// https://firebase.google.com/docs/auth/admin/create-custom-tokens
// https://firebase.google.com/docs/auth/admin/custom-claims
// https://angularfirebase.com/lessons/firestore-security-rules-guide/

// Simple clean up for user
const cleanUpUser = require('./cleanUpUser');
const trimit = require('../msc/trimit');

exports.login = functions.https.onRequest((req, res) => {
  const handleError = (username, error) => {
    console.error({
        User: username
      },
      error
    );
    return res.sendStatus(500);
  };

  const handleResponse = (username, status, body) => {
    console.log({
      User: username
    }, {
      Response: {
        Status: status,
        Body: body
      }
    });
    if (body) {
      return res.status(200).json(body);
    }
    return res.sendStatus(status);
  };

  try {
    cors(req, res, () => {
      const username = req.body.username;
      // Authentication requests are POSTed, other requests are forbidden
      if (req.method !== 'POST') {
        return handleResponse(username, 403);
      }

      console.log(req.body);
      const email = req.body.email ? trimit(req.body.email) : 'empty';
      const uid = email;
      const cookie = req.body.cookie ? true : false;
      const password = req.body.password;

      if (cookie === true) {
        console.log('////// new request below //////' + Date.now());
        const msg = 'cookies received, me hungry';
        const customClaims = {
          username,
          email
        };

        return admin
          .auth()
          .createCustomToken(uid)
          .then(function (customToken, customClaims) {
            // Send token back to client
            // Update real-time database to notify client to force refresh.
            const metadataRef = admin.database().ref('metadata/' + username);
            return handleResponse(username, 200, customToken);
            // return res.sendStatus(200).json(customClaims);
          })
          .catch(function (error) {
            console.log('Error creating custom token:', error);
          });
      }
      console.log('past cookie');
      if (!username) {
        return handleResponse(username, 400, 'line 101');
      }
      if (!password) {
        return handleResponse(username, 400, 'line 104');
      }

      // TODO(DEVELOPER): In production you'll need to update the `authenticate` function so that it authenticates with your own credentials system.
      authenticate(username, password)
        .then(valid => {
          if (!valid) {
            return handleResponse(username, 401, 'line 111'); // Invalid username/password
          }
          const email = valid.Email ? valid.Email : username;
          const customClaims = {
            username,
            email
          };
          // Update real-time database to notify client to force refresh.
          // const metadataRef = admin.database().ref('metadata/' + username);
          // console.log(email, customClaims, valid);
          let user = {};
          if (valid.Email) {
            user = cleanUpUser(valid);
            console.log(user);
            updateUser(user);
          }
          // On success return the Firebase Custom Auth Token.
          return admin
            .auth()
            .createCustomToken(email, customClaims)
            .then(firebaseToken => {
              return handleResponse(username, 200, {
                token: firebaseToken,
                valid,
                user
              });
            });
        })
        .catch(error => {
          return handleError(username, error, 'line 140');
        });
    });
  } catch (error) {
    return handleError(username, error, 'line 144');
  }
});

/**
 * Authenticate the provided credentials.
 * TODO(DEVELOPER): In production you'll need to update this function so that it authenticates with your own credentials system.
 * @returns {Promise<boolean>} success or failure.
 */
function authenticate(username, password) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'POST',
      url: 'https://www.webquoin.com/API/Authenticate',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        Username: username,
        Pwd: password
      }
    };

    basicAuthRequest(options, function (error, response, body) {
      if (error) throw new Error(error);
      if (error) {
        return reject(error);
      }
      const statusCode = response ? response.statusCode : 0;
      if (statusCode === 401) {
        // Invalid username/password
        return resolve(false);
      }
      if (statusCode !== 200) {
        return reject(
          Error(
            'invalid response returned from ',
            authEndpoint,
            ' status code ',
            statusCode
          )
        );
      }
      body = JSON.parse(body);
      let res = body[0];
      return resolve(res);
    });
  });
}

function updateUser(updateUser) {
  // users/email to compare and update information in firestore or if no data then sends to createUser
  admin
    .firestore()
    .collection('users')
    .doc(updateUser.email)
    .get()
    .then(doc => {
      console.log(doc);
      if (!doc.data()) {
        return createUser(updateUser);
      } else {
        let firestoreUser = doc.data();
        updateUser.createdAt = firestoreUser.createdAt;
        updateUser = Object.assign(firestoreUser, updateUser);
        console.log(updateUser);
        console.log('About to update User: ' + updateUser.fullName);
        return admin
          .firestore()
          .collection('users')
          .doc(updateUser.email)
          .update(updateUser);
      }
    })
    .catch(err => console.log(err));
}

function createUser(user) {
  let roles = {
    reader: true,
    nickels: false,
    sop: false,
    admin: false,
    editor: false,
    catEditor: false,
    dealer: true
  };
  if (user.class === 'NICKELSM') {
    roles.sop = true;
    roles.nickels = true;
    roles.dealer = false;
  }
  user.roles = roles;
  user.createdAt = FieldValue.serverTimestamp();
  console.log(user);
  console.log('About to create a new User for: ' + user.fullName);
  return admin
    .firestore()
    .collection('users')
    .doc(user.email)
    .set(user);
}
