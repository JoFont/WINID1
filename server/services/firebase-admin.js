
const admin = require('firebase-admin');

const serviceAccount = require("./private/winid-1-service-account-file.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://winid1.firebaseio.com"
});

module.exports = admin;