const express = require('express');
const router = express.Router();
const controllerDublador = require('../controller/dublador/controller_dublador.js');

router.get('/v1/locadora/dublador', async (req, res) => {
  const dublador = await controllerDublador.listarDubladores();
  res.status(dublador.status_code).json(dublador);
});

router.get('/v1/locadora/dublador/:id', async (req, res) => {
  const idDublador = req.params.id;
  const dublador = await controllerDublador.buscarDubladorId(idDublador);
  res.status(dublador.status_code).json(dublador);
});

router.post('/v1/locadora/dublador', async (req, res) => {
  const dados = req.body;
  const contentType = req.headers['content-type'];
  const dublador = await controllerDublador.inserirDublador(dados, contentType);
  res.status(dublador.status_code).json(dublador);
});

router.put('/v1/locadora/dublador/:id', async (req, res) => {
  const id = req.params.id;
  const dados = req.body;
  const contentType = req.headers['content-type'];
  const dublador = await controllerDublador.atualizarDublador(dados, id, contentType);
  res.status(dublador.status_code).json(dublador);
});

router.delete('/v1/locadora/dublador/:id', async (req, res) => {
  const id = req.params.id;
  const resultado = await controllerDublador.excluirDublador(id);
  res.status(resultado.status_code).json(resultado);
});

module.exports = router;
