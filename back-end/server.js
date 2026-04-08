require('dotenv').config();
//requerendo o a biblioteca dotenv para esse arquivo

const express = require('express');
// buscando o framework express e estanciando suas ferramentas dentro da variavel express

const routes = require('./routes.js'); 
// IMPORTAÇÃO: chamando o arquivo routes.js que está na mesma pasta (back-end)

const app = express();
// estou estanciando as funcionalidades do framework express dentro da variavel app

const PORT = process.env.PORT || 3000;
// estou criando uma alternativa a alocação da aplicação da nuvem ou na porta logica 3000 desse note

const cors = require('cors');
// estanciando o cors pq ele é o responsavel pela comunicação entre back e front

app.use(express.json());
// essa linha funciona como um middlware essa faz a tradução entre express e json

app.use(cors());
// estou usando as ferramentos da variavel app para por o cros no trabalho

app.get('/', (req, res) => {
    res.send('servidor ativo👍');
});
// informando que o endereço / esta ativo

app.use(routes);
// PONTE DE CONEXÃO: agora o servidor aguarda as requisições e as direciona para o arquivo de rotas único

app.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}🚀`);
});
// informa a porta que sera usada

module.exports = app;
// deixa a variavel app para outros arquivos caso desejem usar