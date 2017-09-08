const config = require('./source/config');

module.exports = {
  development: {
    client: 'postgresql',
    connection: config.database.url,
  },
  staging: {
    client: 'postgresql',
    connection: config.database.url,
  },
  production: {
    client: 'postgresql',
    connection: config.database.url,
  },
};
