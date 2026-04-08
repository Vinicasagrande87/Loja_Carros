const knex = require('../database/db');

module.exports = {
    async index(req, res) {
        const modelos = await knex('modelos')
            .join('marcas', 'marcas.id', 'modelos.marca_id')
            .select('modelos.*', 'marcas.nome as marca_nome');
        return res.json(modelos);
    },
    async create(req, res) {
        await knex('modelos').insert(req.body);
        return res.status(201).send();
    }
};