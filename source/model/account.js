const db = require('../service/database');

const create = (body) => {
  return knex('accounts')
    .insert(body)
    .returning('*');
};

const find = (filter) => {
  return knex
    .select('*')
    .from('accounts')
    .where(filter.where)
    .limit(filter.limit || 20)
    .offset(filter.offset || 0);
};

module.exports = {
  create,
  find,
};
