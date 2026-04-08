const knex = require('../database/db');

module.exports = {
    async index(req, res) {
        const marcas = await knex('marcas').orderBy('nome');
        return res.json(marcas);
    },
    async create(req, res) {
        try {
            await knex('marcas').insert(req.body);
            return res.status(201).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};