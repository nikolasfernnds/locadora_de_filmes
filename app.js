/******************************************************************************
 * Objetivo: Arquivo principal da API de filmes
 * Autor: Nikolas Fernandes Vieira
 * Data: 07/10/2025
 * Versão: 1.0
 *****************************************************************************/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const controllerFilme = require('./controller/filme/controller_filme.js');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.get('/v1/locadora/filme', async (req, res) => {
  const filme = await controllerFilme.listarFilmes();
  res.status(filme.status_code).json(filme);
});

app.get('/v1/locadora/filme/:id', async (req, res) => {
  const idFilme = req.params.id;
  const filme = await controllerFilme.buscarFilmeId(idFilme);
  res.status(filme.status_code).json(filme);
});

app.post('/v1/locadora/filme', async (req, res) => {
  const dados = req.body;
  const contentType = req.headers['content-type'];
  const filme = await controllerFilme.inserirFilme(dados, contentType);
  res.status(filme.status_code).json(filme);
});

app.put('/v1/locadora/filme/:id', async (req, res) => {
  const id = req.params.id;
  const dados = req.body;
  const contentType = req.headers['content-type'];
  const filme = await controllerFilme.atualizarFilme(dados, id, contentType);
  res.status(filme.status_code).json(filme);
});

app.delete('/v1/locadora/filme/:id', async (req, res) => {
  const id = req.params.id;
  const resultado = await controllerFilme.excluirFilme(id);
  res.status(resultado.status_code).json(resultado);
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`API aguardando requisições!!`);
});

