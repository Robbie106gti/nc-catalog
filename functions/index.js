'use strict';
const functions = require('firebase-functions');

// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({
  origin: true
});

// Firebase Setup
const admin = require('firebase-admin');
const serviceAccount = require('./nickels-catalog-firebase-adminsdk-m8g1g-600cf4ab30.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nickels-catalog.firebaseio.com'
});

// We use Request to make the basic authentication request in our example.
const basicAuthRequest = require('request');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((req, res) => {
//   res.send("Hello from Firebase!");
//  });
 
 exports.auth = functions.https.onRequest((req, res) => {
  const handleError = (username, error) => {
    console.error({
      User: username
    }, error);
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
      authenticate(username, password).then(valid => {
        if (!valid) {
          return handleResponse(username, 401); // Invalid username/password
        }
        
        // On success return the Firebase Custom Auth Token.
        return admin.auth().createCustomToken(username).then(firebaseToken => {
          return handleResponse(username, 200, {
            token: firebaseToken,
            valid       
          });
        });
      }).catch(error => {
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
    var options = { method: 'POST',
    url: 'http://www.testquoin.com/API/Authenticate',
    headers: 
      { 'Postman-Token': '45e802d5-3a2a-4a0c-33db-536f0012f472',
        'Cache-Control': 'no-cache',
        'Authorization': 'Basic Um9iZXJ0OnJvYjJuaWNrZWxz',
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
      formData: { Username: username, Pwd: password } };

    basicAuthRequest(options, function (error, response, body) {
      if (error) throw new Error(error);
      if (error) {
        return reject(error);
      }
      const statusCode = response ? response.statusCode : 0;
      if (statusCode === 401) { // Invalid username/password
        return resolve(false);
      }
      if (statusCode !== 200) {
        return reject(Error('invalid response returned from ', authEndpoint, ' status code ', statusCode));
      }
      body = JSON.parse(body);
      let res = body[0];
      return resolve(res);
    });
  });
}
