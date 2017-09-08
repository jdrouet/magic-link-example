const knex = require('../../source/service/database');

const rollbackAll = () =>
  knex.migrate
    .currentVersion()
    .then((version) => {
      if (version === 'none') return null;
      return knex.migrate
        .rollback()
        .then(rollbackAll);
    });

const reset = () =>
  rollbackAll()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run());

module.exports = { reset };
