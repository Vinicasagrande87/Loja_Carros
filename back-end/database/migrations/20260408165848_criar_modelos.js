exports.up = function(knex) {
  return knex.schema.createTable('modelos', (table) => {
    table.increments('id_modelo').primary();
    table.integer('id_marca').unsigned().notNullable()
      .references('id_marca').inTable('marcas').onDelete('CASCADE');
    table.string('nome', 100).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('modelos');
};