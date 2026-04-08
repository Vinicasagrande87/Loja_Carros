const knex = require('../database/db');

module.exports = {
    async index(req, res) {
        const { veiculo_id } = req.params;
        const fotos = await knex('fotos').where({ veiculo_id });
        return res.json(fotos);
    },
    async create(req, res) {
        const { url, veiculo_id } = req.body;
        await knex('fotos').insert({ url, veiculo_id });
        return res.status(201).send();
    }
};