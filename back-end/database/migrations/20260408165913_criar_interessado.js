exports.up = function(knex) {
  return knex.schema.createTable('interessados', (table) => {
    table.increments('id_lead').primary();
    table.integer('id_veiculo').unsigned().notNullable()
      .references('id_veiculo').inTable('veiculos');
    table.string('nome_cliente', 100).notNullable();
    table.string('email', 100);
    table.string('telemovel', 20).notNullable();
    table.text('mensagem');
    table.timestamp('data_contacto').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('interessados');
};