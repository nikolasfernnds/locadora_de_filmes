/******************************************************************************
 * Objetivo: Arquivo principal da API de filmes e gêneros
 * Autor: Nikolas Fernandes Vieira
 * Data: 07/10/2025
 * Versão: 2.0
 *****************************************************************************/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Import das rotas
const filmeRoutes = require('./routes/filmeRoutes.js');
const generoRoutes = require('./routes/generoRoutes.js');
const dubladorRoutes = require('./routes/dubladorRoutes.js');
const classificacaoRoutes = require('./routes/classificacaoIndicativaRoutes.js');
const papelRoutes = require('./routes/papelRoutes.js');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.use(filmeRoutes);
app.use(generoRoutes);
app.use(dubladorRoutes);
app.use(classificacaoRoutes);
app.use(papelRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'API Locadora Online - Nikolas Fernandes Vieira',
  });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

