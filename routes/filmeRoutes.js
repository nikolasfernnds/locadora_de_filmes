/******************************************************************************
 * Rotas de Filme
 *****************************************************************************/

const express = require('express');
const router = express.Router();
const controllerFilme = require('../controller/filme/controller_filme.js');

router.get('/v1/locadora/filme', async (req, res) => {
  const filme = await controllerFilme.listarFilmes();
  res.status(filme.status_code).json(filme);
});

router.get('/v1/locadora/filme/:id', async (req, res) => {
  const idFilme = req.params.id;
  const filme = await controllerFilme.buscarFilmeId(idFilme);
  res.status(filme.status_code).json(filme);
});

router.post('/v1/locadora/filme', async (req, res) => {
  const dados = req.body;
  const contentType = req.headers['content-type'];
  const filme = await controllerFilme.inserirFilme(dados, contentType);
  res.status(filme.status_code).json(filme);
});

router.put('/v1/locadora/filme/:id', async (req, res) => {
  const id = req.params.id;
  const dados = req.body;
  const contentType = req.headers['content-type'];
  const filme = await controllerFilme.atualizarFilme(dados, id, contentType);
  res.status(filme.status_code).json(filme);
});

router.delete('/v1/locadora/filme/:id', async (req, res) => {
  const id = req.params.id;
  const resultado = await controllerFilme.excluirFilme(id);
  res.status(resultado.status_code).json(resultado);
});

module.exports = router;
