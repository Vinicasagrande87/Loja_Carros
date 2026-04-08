exports.up = function(knex) {
  return knex.schema.createTable('veiculos', (table) => {
    table.increments('id_veiculo').primary();
    table.integer('id_marca').unsigned().notNullable()
      .references('id_marca').inTable('marcas');
    table.integer('id_modelo').unsigned().notNullable()
      .references('id_modelo').inTable('modelos');
    table.integer('id_categoria').unsigned().notNullable()
      .references('id_categoria').inTable('categorias');
    table.integer('ano_fabricacao').notNullable();
    table.integer('ano_modelo').notNullable();
    table.integer('quilometragem').notNullable();
    table.string('cor', 50).notNullable();
    table.decimal('preco', 12, 2).notNullable();
    table.string('combustivel', 30);
    table.string('transmissao', 30);
    table.text('descricao').notNullable();
    table.string('status', 20);
    table.boolean('destaque').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('veiculos');
};