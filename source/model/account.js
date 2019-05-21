const db = require('../service/database');

db.raw('select 1+1 as result').then(function() {
  console.log('Database connection successful!');
}).catch(function() {
  console.log('There was an error connecting to the database.');
});

const create = (body) => {
  return db('accounts')
    .insert(body)
    .returning('*');
};

const find = (filter) => {
  return db
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
