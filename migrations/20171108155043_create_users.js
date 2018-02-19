exports.up = knex => knex.schema.createTable('users', (table) => {
  table.increments();
  table.string('email').notNullable().unique().index();
  table.string('password', 60).notNullable();
  table.timestamps(false, true);
});


exports.down = knex => knex.schema.dropTable('users');
