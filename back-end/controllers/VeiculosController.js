const knex = require('../database/db');

module.exports = {
    // Listar todos os veículos (com nomes de marca e modelo)
    async index(req, res) {
        try {
            const veiculos = await knex('veiculos')
                .join('marcas', 'veiculos.id_marca', '=', 'marcas.id_marca')
                .join('modelos', 'veiculos.id_modelo', '=', 'modelos.id_modelo')
                .select(
                    'veiculos.*',
                    'marcas.nome as marca_nome',
                    'modelos.nome as modelo_nome'
                )
                .orderBy('veiculos.id_veiculo', 'desc');

            return res.json(veiculos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao buscar veículos.' });
        }
    },

    // Buscar um veículo específico pelo ID
    async show(req, res) {
        try {
            const { id } = req.params;
            const veiculo = await knex('veiculos')
                .join('marcas', 'veiculos.id_marca', '=', 'marcas.id_marca')
                .join('modelos', 'veiculos.id_modelo', '=', 'modelos.id_modelo')
                .select(
                    'veiculos.*',
                    'marcas.nome as marca_nome',
                    'modelos.nome as modelo_nome'
                )
                .where('veiculos.id_veiculo', id)
                .first();

            if (!veiculo) {
                return res.status(404).json({ error: 'Veículo não encontrado.' });
            }

            return res.json(veiculo);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // Criar novo veículo (usando todos os atributos que você definiu)
    async create(req, res) {
        try {
            const {
                id_marca,
                id_modelo,
                id_categoria,
                ano_fabricacao,
                ano_modelo,
                quilometragem,
                cor,
                preco,
                combustivel,
                transmissao,
                descricao,
                status,
                destaque
            } = req.body;

            const [novoVeiculo] = await knex('veiculos').insert({
                id_marca,
                id_modelo,
                id_categoria,
                ano_fabricacao,
                ano_modelo,
                quilometragem,
                cor,
                preco,
                combustivel,
                transmissao,
                descricao,
                status,
                destaque: destaque || false
            }).returning('*');

            return res.status(201).json(novoVeiculo);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar veículo. Verifique os campos obrigatórios.' });
        }
    },

    // Atualizar dados do veículo
    async update(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;

            const atualizado = await knex('veiculos')
                .where('id_veiculo', id)
                .update(dados);

            if (!atualizado) {
                return res.status(404).json({ error: 'Veículo não encontrado para atualizar.' });
            }

            return res.json({ message: 'Veículo atualizado com sucesso!' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // Excluir veículo
    async delete(req, res) {
        try {
            const { id } = req.params;

            const excluido = await knex('veiculos')
                .where('id_veiculo', id)
                .del();

            if (!excluido) {
                return res.status(404).json({ error: 'Veículo não encontrado para exclusão.' });
            }

            return res.json({ message: 'Veículo removido com sucesso!' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};