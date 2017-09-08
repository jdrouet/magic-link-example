const jwt = require('express-jwt');
const config = require('../config');

const authenticated = jwt({
  secret: config.jwt.secret,
  credentialsRequired: false,
  getToken: (req) => {
    if (req.query) return req.query.token;
    return null;
  },
});

module.exports = { authenticated };
