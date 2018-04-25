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
const serviceAccount = require('./nickels-catalog-firebase-adminsdk-m8g1g-600cf4ab30.json');

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

exports.auth = functions.https.onRequest((req, res) => {
  const handleError = (username, error) => {
    console.error(
      {
        User: username
      },
      error
    );
    return res.sendStatus(500);
  };

  const handleResponse = (username, status, body) => {
    console.log(
      {
        User: username
      },
      {
        Response: {
          Status: status,
          Body: body
        }
      }
    );
    if (body) {
      return res.status(200).json(body);
    }
    return res.sendStatus(status);
  };

  let username = '';
  try {
    cors(req, res, () => {
      // Authentication requests are POSTed, other requests are forbidden
      if (req.method !== 'POST') {
        return handleResponse(username, 403);
      }
      username = req.body.username;
      if (!username) {
        return handleResponse(username, 400);
      }
      const password = req.body.password;
      if (!password) {
        return handleResponse(username, 400);
      }

      // TODO(DEVELOPER): In production you'll need to update the `authenticate` function so that it authenticates with your own credentials system.
      authenticate(username, password)
        .then(valid => {
          if (!valid) {
            return handleResponse(username, 401); // Invalid username/password
          }
          const email = valid.Email;
          const customClaims = {
            username,
            email
          };
          // Update real-time database to notify client to force refresh.
          const metadataRef = admin.database().ref('metadata/' + username);
          console.log(email, customClaims, valid);
          updateUser(valid);
          // On success return the Firebase Custom Auth Token.
          return admin
            .auth()
            .createCustomToken(email, customClaims)
            .then(firebaseToken => {
              return handleResponse(username, 200, {
                token: firebaseToken,
                valid
              });
            });
        })
        .catch(error => {
          return handleError(username, error);
        });
    });
  } catch (error) {
    return handleError(username, error);
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
      url: 'http://www.testquoin.com/API/Authenticate',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        Username: username,
        Pwd: password
      }
    };

    basicAuthRequest(options, function(error, response, body) {
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

function updateUser(loggedinUser) {
  // users/email to compare and update information
  admin
    .firestore()
    .collection('users')
    .doc(loggedinUser.Email)
    .get()
    .then(doc => {
      const fname = trimit(loggedinUser.FirstName);
      const lname = trimit(loggedinUser.LastName);
      const email = trimit(loggedinUser.Email);
      let updateUser = {
        id: email,
        status: 'online',
        class: trimit(loggedinUser.DealerID),
        dealerName: trimit(loggedinUser.DealerName),
        displayName: trimit(loggedinUser.DisplayName),
        firstName: fname,
        lastName: lname,
        email: email,
        fullName: fname + ' ' + lname,
        username: trimit(loggedinUser.UserName),
        updatedAt: FieldValue.serverTimestamp(),
        wqData: loggedinUser
      };
      if (!doc) {
        return makeUser(updateUser);
      }
      console.log(doc.data());
      let firestoreUser = doc.data();
      firestoreUser.functions = 'functions updated';
      firestoreUser.roles.functions = true;
      updateUser = Object.assign(firestoreUser, updateUser);
      console.log(updateUser);
      admin
        .firestore()
        .collection('users')
        .doc(loggedinUser.email)
        .update(updateUser);
    })
    .catch(err => console.log(err));
}

function trimit(str) {
  return str ? str.trim() : '';
}

function makeUser(user) {
  let roles = { reader: true };
  user.DealerID === 'NICKELSM' ? (roles[sop] = true) : '';
  user[roles] = roles;
  admin
    .firestore()
    .collection('users')
    .doc(user.email)
    .set(user);
}
