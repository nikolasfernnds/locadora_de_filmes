const express = require('express');
const router = express.Router();
const controllerClassificacao = require('../controller/classificacao_indicativa/controller_classificacao_indicativa.js');

router.get('/v1/locadora/classificacao', async (req, res) => {
  const classificacao = await controllerClassificacao.listarClassificacoes();
  res.status(classificacao.status_code).json(classificacao);
});

router.get('/v1/locadora/classificacao/:id', async (req, res) => {
  const id = req.params.id;
  const classificacao = await controllerClassificacao.buscarClassificacaoId(id);
  res.status(classificacao.status_code).json(classificacao);
});

router.post('/v1/locadora/classificacao', async (req, res) => {
  const dados = req.body;
  const contentType = req.headers['content-type'];
  const classificacao = await controllerClassificacao.inserirClassificacao(dados, contentType);
  res.status(classificacao.status_code).json(classificacao);
});

router.put('/v1/locadora/classificacao/:id', async (req, res) => {
  const id = req.params.id;
  const dados = req.body;
  const contentType = req.headers['content-type'];
  const classificacao = await controllerClassificacao.atualizarClassificacao(dados, id, contentType);
  res.status(classificacao.status_code).json(classificacao);
});

router.delete('/v1/locadora/classificacao/:id', async (req, res) => {
  const id = req.params.id;
  const resultado = await controllerClassificacao.excluirClassificacao(id);
  res.status(resultado.status_code).json(resultado);
});

module.exports = router;
