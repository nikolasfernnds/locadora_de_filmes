const generoDAO = require('../../model/DAO/genero.js');
const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

const listarGeneros = async () => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  try {
    const generos = await generoDAO.getSelectAllGeneros();

    if (generos && generos.length > 0) {
      MESSAGES.DEFAULT_HEADER.status = true;
      MESSAGES.DEFAULT_HEADER.status_code = 200;
      MESSAGES.DEFAULT_HEADER.itens.genero = generos;
      return MESSAGES.DEFAULT_HEADER;
    } else {
      return MESSAGES.ERROR_NOT_FOUND;
    }
  } catch {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const buscarGeneroId = async (id) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (!id || isNaN(id) || id <= 0) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID inválido]';
    return MESSAGES.ERROR_REQUIRED_FIELDS;
  }

  try {
    const genero = await generoDAO.getSelectByIdGeneros(Number(id));

    if (genero && genero.length > 0) {
      MESSAGES.DEFAULT_HEADER.status = true;
      MESSAGES.DEFAULT_HEADER.status_code = 200;
      MESSAGES.DEFAULT_HEADER.itens.genero = genero;
      return MESSAGES.DEFAULT_HEADER;
    } else {
      return MESSAGES.ERROR_NOT_FOUND;
    }
  } catch {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const inserirGenero = async (genero, contentType) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (String(contentType).toUpperCase() !== 'APPLICATION/JSON')
    return MESSAGES.ERROR_CONTENT_TYPE;

  const erroValidacao = validarDadosGenero(genero);
  if (erroValidacao) return erroValidacao;

  const inserido = await generoDAO.setInsertGeneros(genero);
  if (inserido) {
    MESSAGES.DEFAULT_HEADER.status = true;
    MESSAGES.DEFAULT_HEADER.status_code = 201;
    MESSAGES.DEFAULT_HEADER.message = 'Gênero inserido com sucesso!';
    return MESSAGES.DEFAULT_HEADER;
  } else {
    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
  }
};

const atualizarGenero = async (genero, id, contentType) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (String(contentType).toUpperCase() !== 'APPLICATION/JSON')
    return MESSAGES.ERROR_CONTENT_TYPE;

  const erroValidacao = validarDadosGenero(genero);
  if (erroValidacao) return erroValidacao;

  const existe = await buscarGeneroId(id);
  if (existe.status_code !== 200) return existe;

  genero.id = Number(id);
  const atualizado = await generoDAO.setUpdateGeneros(genero);

  if (atualizado) {
    MESSAGES.DEFAULT_HEADER.status = true;
    MESSAGES.DEFAULT_HEADER.status_code = 200;
    MESSAGES.DEFAULT_HEADER.message = 'Gênero atualizado com sucesso!';
    MESSAGES.DEFAULT_HEADER.itens.genero = genero;
    return MESSAGES.DEFAULT_HEADER;
  } else {
    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
  }
};

const excluirGenero = async (id) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (!id || isNaN(id) || id <= 0) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID inválido]';
    return MESSAGES.ERROR_REQUIRED_FIELDS;
  }

  const existe = await buscarGeneroId(id);
  if (existe.status_code !== 200) return existe;

  const deletado = await generoDAO.setDeleteGeneros(Number(id));
  if (deletado) {
    MESSAGES.DEFAULT_HEADER.status = true;
    MESSAGES.DEFAULT_HEADER.status_code = 200;
    MESSAGES.DEFAULT_HEADER.message = 'Gênero excluído com sucesso.';
    return MESSAGES.DEFAULT_HEADER;
  } else {
    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
  }
};

const validarDadosGenero = (genero) => {
  const camposInvalidos = [];

  if (!genero.categoria || genero.categoria.length > 100) camposInvalidos.push('categoria');

  if (camposInvalidos.length > 0) {
    const msg = `Campos obrigatórios ausentes ou inválidos: ${camposInvalidos.join(', ')}`;
    return { status: false, status_code: 400, message: msg };
  }

  return null;
};

module.exports = {
  listarGeneros,
  buscarGeneroId,
  inserirGenero,
  atualizarGenero,
  excluirGenero
};
