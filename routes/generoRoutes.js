/******************************************************************************
 * Rotas de Gênero
 *****************************************************************************/

const express = require('express');
const router = express.Router();
const controllerGenero = require('../controller/genero/controller_genero.js');

router.get('/v1/locadora/genero', async (req, res) => {
  const genero = await controllerGenero.listarGeneros();
  res.status(genero.status_code).json(genero);
});

router.get('/v1/locadora/genero/:id', async (req, res) => {
  const idGenero = req.params.id;
  const genero = await controllerGenero.buscarGeneroId(idGenero);
  res.status(genero.status_code).json(genero);
});

router.post('/v1/locadora/genero', async (req, res) => {
  const dados = req.body;
  const contentType = req.headers['content-type'];
  const genero = await controllerGenero.inserirGenero(dados, contentType);
  res.status(genero.status_code).json(genero);
});

router.put('/v1/locadora/genero/:id', async (req, res) => {
  const id = req.params.id;
  const dados = req.body;
  const contentType = req.headers['content-type'];
  const genero = await controllerGenero.atualizarGenero(dados, id, contentType);
  res.status(genero.status_code).json(genero);
});

router.delete('/v1/locadora/genero/:id', async (req, res) => {
  const id = req.params.id;
  const resultado = await controllerGenero.excluirGenero(id);
  res.status(resultado.status_code).json(resultado);
});

module.exports = router;
