/******************************************************************************
 * Objetivo: Controller responsável por lidar entre a Model e as rotas
 * Autor: Nikolas Fernandes Vieira
 * Data: 07/10/2025
 * Versão: 1.0
 *****************************************************************************/

const filmeDAO = require('../../model/DAO/filme.js');
const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

const listarFilmes = async () => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  try {
    const filmes = await filmeDAO.getSelectAllMovies();

    if (filmes && filmes.length > 0) {
      MESSAGES.DEFAULT_HEADER.status = true;
      MESSAGES.DEFAULT_HEADER.status_code = 200;
      MESSAGES.DEFAULT_HEADER.itens.filme = filmes;
      return MESSAGES.DEFAULT_HEADER;
    } else {
      return MESSAGES.ERROR_NOT_FOUND;
    }
  } catch {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const buscarFilmeId = async (id) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (!id || isNaN(id) || id <= 0) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID inválido]';
    return MESSAGES.ERROR_REQUIRED_FIELDS;
  }

  try {
    const filme = await filmeDAO.getSelectByIdMovies(Number(id));

    if (filme && filme.length > 0) {
      MESSAGES.DEFAULT_HEADER.status = true;
      MESSAGES.DEFAULT_HEADER.status_code = 200;
      MESSAGES.DEFAULT_HEADER.itens.filme = filme;
      return MESSAGES.DEFAULT_HEADER;
    } else {
      return MESSAGES.ERROR_NOT_FOUND;
    }
  } catch {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const inserirFilme = async (filme, contentType) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (String(contentType).toUpperCase() !== 'APPLICATION/JSON')
    return MESSAGES.ERROR_CONTENT_TYPE;

  const erroValidacao = await validarDadosFilme(filme);
  if (erroValidacao) return erroValidacao;

  const inserido = await filmeDAO.setInsertMovies(filme);
  if (inserido) {
    MESSAGES.DEFAULT_HEADER.status = true;
    MESSAGES.DEFAULT_HEADER.status_code = 201;
    MESSAGES.DEFAULT_HEADER.message = 'Filme inserido com sucesso!';
    return MESSAGES.DEFAULT_HEADER;
  } else {
    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
  }
};

const atualizarFilme = async (filme, id, contentType) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (String(contentType).toUpperCase() !== 'APPLICATION/JSON')
    return MESSAGES.ERROR_CONTENT_TYPE;

  const erroValidacao = await validarDadosFilme(filme);
  if (erroValidacao) return erroValidacao;

  const existe = await buscarFilmeId(id);
  if (existe.status_code !== 200) return existe;

  filme.id = Number(id);
  const atualizado = await filmeDAO.setUpdateMovies(filme);

  if (atualizado) {
    MESSAGES.DEFAULT_HEADER.status = true;
    MESSAGES.DEFAULT_HEADER.status_code = 200;
    MESSAGES.DEFAULT_HEADER.message = 'Filme atualizado com sucesso!';
    MESSAGES.DEFAULT_HEADER.itens.filme = filme;
    return MESSAGES.DEFAULT_HEADER;
  } else {
    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
  }
};

const excluirFilme = async (id) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (!id || isNaN(id) || id <= 0) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID inválido]';
    return MESSAGES.ERROR_REQUIRED_FIELDS;
  }

  const existe = await buscarFilmeId(id);
  if (existe.status_code !== 200) return existe;

  const deletado = await filmeDAO.setDeleteMovies(Number(id));
  if (deletado) {
    MESSAGES.DEFAULT_HEADER.status = true;
    MESSAGES.DEFAULT_HEADER.status_code = 200;
    MESSAGES.DEFAULT_HEADER.message = 'Filme excluído com sucesso.';
    return MESSAGES.DEFAULT_HEADER;
  } else {
    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
  }
};

const validarDadosFilme = async (filme) => {
  const camposInvalidos = [];

  if (!filme.nome || filme.nome.length > 100) camposInvalidos.push('nome');
  if (!filme.duracao) camposInvalidos.push('duração');
  if (!filme.orcamento || isNaN(filme.orcamento)) camposInvalidos.push('orcamento');
  if (!filme.capa || filme.capa.length > 200) camposInvalidos.push('capa');

  if (camposInvalidos.length > 0) {
    const msg = `Campos obrigatórios ausentes ou inválidos: ${camposInvalidos.join(', ')}`;
    return { status: false, status_code: 400, message: msg };
  }

  return null;
};

module.exports = {
  listarFilmes,
  buscarFilmeId,
  inserirFilme,
  atualizarFilme,
  excluirFilme
};
