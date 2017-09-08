const jwt = require('jsonwebtoken');
const config = require('../config');

const generate = (account) => {
  return Promise.resolve(jwt.sign({ id: account.id }, config.jwt.secret));
};

module.exports = { generate };
