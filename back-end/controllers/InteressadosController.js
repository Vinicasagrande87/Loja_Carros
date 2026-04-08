const knex = require('../database/db');

module.exports = {
    async index(req, res) {
        const leads = await knex('interessados').orderBy('id_interessado', 'desc');
        return res.json(leads);
    },
    async create(req, res) {
        try {
            await knex('interessados').insert(req.body);
            return res.status(201).json({ message: "Interesse registrado!" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};