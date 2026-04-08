/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deleta dados existentes para evitar erro de duplicata ao rodar novamente
  // A ordem de delete importa por causa das chaves estrangeiras!
  await knex('fotos').del();
  await knex('veiculos').del();
  await knex('modelos').del();
  await knex('categorias').del();
  await knex('marcas').del();

  // 1. Inserir Categorias
  await knex('categorias').insert([
    { nome: 'Sedan' },
    { nome: 'SUV' },
    { nome: 'Hatch' },
    { nome: 'Picape' }
  ]);

  // 2. Inserir Marcas
  const [marcaVw] = await knex('marcas').insert([
    { nome: 'Volkswagen', nome_comercial: 'VW', logo_url: 'vw.png' }
  ]).returning('id_marca');

  const [marcaToyota] = await knex('marcas').insert([
    { nome: 'Toyota', nome_comercial: 'Toyota', logo_url: 'toyota.png' }
  ]).returning('id_marca');

  // 3. Inserir Modelos (usando os IDs das marcas acima)
  await knex('modelos').insert([
    { id_marca: marcaVw.id_marca, nome: 'Golf' },
    { id_marca: marcaVw.id_marca, nome: 'Polo' },
    { id_marca: marcaToyota.id_marca, nome: 'Corolla' },
    { id_marca: marcaToyota.id_marca, nome: 'Hilux' }
  ]);
};