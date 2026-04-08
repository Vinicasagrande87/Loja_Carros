exports.up = function(knex) {
  return knex.schema.createTable('marcas', (table) => {
    table.increments('id_marca').primary();
    table.string('nome', 180).notNullable();
    table.string('nome_comercial', 100).notNullable();
    table.string('logo_url', 255);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('marcas');
};