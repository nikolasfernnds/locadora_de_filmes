const express = require('express');
const router = express.Router();
const controllerPapel = require('../controller/papel/controller_papel.js');

router.get('/v1/locadora/papel', async (req, res) => {
  const papel = await controllerPapel.listarPapeis();
  res.status(papel.status_code).json(papel);
});

router.get('/v1/locadora/papel/:id', async (req, res) => {
  const idPapel = req.params.id;
  const papel = await controllerPapel.buscarPapelId(idPapel);
  res.status(papel.status_code).json(papel);
});

router.post('/v1/locadora/papel', async (req, res) => {
  const dados = req.body;
  const contentType = req.headers['content-type'];
  const papel = await controllerPapel.inserirPapel(dados, contentType);
  res.status(papel.status_code).json(papel);
});

router.put('/v1/locadora/papel/:id', async (req, res) => {
  const id = req.params.id;
  const dados = req.body;
  const contentType = req.headers['content-type'];
  const papel = await controllerPapel.atualizarPapel(dados, id, contentType);
  res.status(papel.status_code).json(papel);
});

router.delete('/v1/locadora/papel/:id', async (req, res) => {
  const id = req.params.id;
  const resultado = await controllerPapel.excluirPapel(id);
  res.status(resultado.status_code).json(resultado);
});

module.exports = router;
