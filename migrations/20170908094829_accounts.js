exports.up = function(knex, Promise) {
  return knex.schema.createTable('accounts', function(table) {
    table.increments();
    table.text('email').notNullable().unique();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('accounts');
};
