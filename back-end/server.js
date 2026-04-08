require('dotenv').config();
// requerendo a biblioteca dotenv para esse arquivo

const express = require('express');
// buscando o framework express e instanciando suas ferramentas dentro da variável express

const routes = require('./routes.js'); 
// IMPORTAÇÃO: chamando o arquivo routes.js que está na mesma pasta

const cors = require('cors');
// instanciando o cors porque ele é o responsável pela comunicação entre back e front

const app = express();
// estou instanciando as funcionalidades do framework express dentro da variável app

const PORT = process.env.PORT || 3000;
// estou criando uma alternativa à alocação da aplicação na nuvem ou na porta lógica 3000 desse note

// --- MIDDLEWARES ---

app.use(express.json());
// essa linha funciona como um middleware, faz a tradução entre express e json

app.use(cors());
// estou usando as ferramentas da variável app para colocar o cors no trabalho

app.use('/uploads', express.static('uploads'));
// LIBERAÇÃO DE ACESSO: permite que as fotos salvas na pasta 'uploads' sejam acessadas via navegador/URL

app.get('/', (req, res) => {
    res.send('servidor ativo👍');
});
// informando que o endereço / está ativo

app.use(routes);
// PONTE DE CONEXÃO: agora o servidor aguarda as requisições e as direciona para o arquivo de rotas único

app.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}🚀`);
});
// informa a porta que será usada

module.exports = app;
// deixa a variável app disponível para outros arquivos caso desejem usar