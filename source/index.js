const express = require('express');
const config = require('./config');
const server = express();

server.use(require('body-parser').json());
server.use(require('./middleware/authentication').authenticated);

server.get('/api/accounts/me', require('./controller/accounts-me'));
server.post('/api/accounts/login', require('./controller/accounts-login'));

module.exports = server;

if (!module.parent) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Listen on port ${config.port} 🌎`);
  });
}
