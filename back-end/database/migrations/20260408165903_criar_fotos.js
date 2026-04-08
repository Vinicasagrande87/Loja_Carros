exports.up = function(knex) {
  return knex.schema.createTable('fotos', (table) => { // Veja se tem o "return" aqui
    table.increments('id_foto').primary();
    table.integer('id_veiculo').unsigned().notNullable()
      .references('id_veiculo').inTable('veiculos').onDelete('CASCADE');
    table.string('url_imagem', 255).notNullable();
    table.integer('ordem').defaultTo(0);
    table.boolean('is_principal').defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('fotos'); // E o "return" aqui também
};