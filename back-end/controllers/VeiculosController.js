const knex = require('../database/db');

module.exports = {
    async index(req, res) {
        try {
            const veiculos = await knex('veiculos')
                // Ajustado: id_modelo em ambas as tabelas e id_marca em ambas
                .join('modelos', 'modelos.id_modelo', 'veiculos.id_modelo')
                .join('marcas', 'marcas.id_marca', 'modelos.id_marca')
                .select(
                    'veiculos.*',
                    'modelos.nome as modelo',
                    'marcas.nome as marca'
                );
            return res.json(veiculos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ 
                error: "Erro ao buscar veículos", 
                details: error.message 
            });
        }
    },

    async show(req, res) {
        try {
            const { id } = req.params;
            const veiculo = await knex('veiculos')
                .join('modelos', 'modelos.id_modelo', 'veiculos.id_modelo')
                .join('marcas', 'marcas.id_marca', 'modelos.id_marca')
                .select('veiculos.*', 'modelos.nome as modelo', 'marcas.nome as marca')
                .where('veiculos.id_veiculo', id)
                .first();

            if (!veiculo) {
                return res.status(404).json({ error: "Veículo não encontrado" });
            }

            return res.json(veiculo);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async create(req, res) {
        try {
            const [novoVeiculo] = await knex('veiculos').insert(req.body).returning('*');
            return res.status(201).json(novoVeiculo);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            await knex('veiculos').where('id_veiculo', id).update(req.body);
            return res.json({ message: "Veículo atualizado com sucesso!" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            await knex('veiculos').where('id_veiculo', id).del();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};