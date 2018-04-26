const FieldValue = require('firebase-admin').firestore.FieldValue;
const trimit = require('../msc/trimit');

const cleanUpUser = valid => {
  const fname = trimit(valid.FirstName);
  const lname = trimit(valid.LastName);
  const email = trimit(valid.Email);
  const updateUser = {
    id: email,
    status: 'online',
    class: trimit(valid.DealerID),
    dealerName: trimit(valid.DealerName),
    displayName: trimit(valid.DisplayName),
    firstName: fname,
    lastName: lname,
    email: email,
    fullName: fname + ' ' + lname,
    username: trimit(valid.UserName),
    updatedAt: FieldValue.serverTimestamp(),
    createdAt: '',
    wqData: valid
  };
  console.log('User cleaned up' + updateUser.fullName);
  return updateUser;
};

module.exports = cleanUpUser;
