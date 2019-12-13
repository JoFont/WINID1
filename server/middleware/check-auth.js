const admin = require('../services/firebase-admin');

const getAuthToken = (req, res, next) => {
  console.log('AUTHO', req.headers.authorization);
  console.log('BEARER', req.headers.authorization.split(' ')[0]);
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};

const checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    console.log('CHECAUTH', req);
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.authId = userInfo.uid;
      console.log('CHECAUTH', req);
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
};

module.exports = checkIfAuthenticated;
