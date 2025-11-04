const papelDAO = require('../../model/DAO/papel.js');
const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

const listarPapeis = async () => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  try {
    const papeis = await papelDAO.getSelectAllPapeis();

    if (papeis && papeis.length > 0) {
      MESSAGES.DEFAULT_HEADER.status = true;
      MESSAGES.DEFAULT_HEADER.status_code = 200;
      MESSAGES.DEFAULT_HEADER.itens.papeis = papeis;
      return MESSAGES.DEFAULT_HEADER;
    } else {
      return MESSAGES.ERROR_NOT_FOUND;
    }
  } catch {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const buscarPapelId = async (id) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (!id || isNaN(id) || id <= 0) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID inválido]';
    return MESSAGES.ERROR_REQUIRED_FIELDS;
  }

  try {
    const papel = await papelDAO.getSelectByIdPapeis(Number(id));

    if (papel && papel.length > 0) {
      MESSAGES.DEFAULT_HEADER.status = true;
      MESSAGES.DEFAULT_HEADER.status_code = 200;
      MESSAGES.DEFAULT_HEADER.itens.papel = papel;
      return MESSAGES.DEFAULT_HEADER;
    } else {
      return MESSAGES.ERROR_NOT_FOUND;
    }
  } catch {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const inserirPapel = async (papel, contentType) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (String(contentType).toUpperCase() !== 'APPLICATION/JSON')
    return MESSAGES.ERROR_CONTENT_TYPE;

  const erroValidacao = validarDadosPapel(papel);
  if (erroValidacao) return erroValidacao;

  const inserido = await papelDAO.setInsertPapeis(papel);
  if (inserido) {
    MESSAGES.DEFAULT_HEADER.status = true;
    MESSAGES.DEFAULT_HEADER.status_code = 201;
    MESSAGES.DEFAULT_HEADER.message = 'Papel inserido com sucesso!';
    return MESSAGES.DEFAULT_HEADER;
  } else {
    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
  }
};

const atualizarPapel = async (papel, id, contentType) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (String(contentType).toUpperCase() !== 'APPLICATION/JSON')
    return MESSAGES.ERROR_CONTENT_TYPE;

  const erroValidacao = validarDadosPapel(papel);
  if (erroValidacao) return erroValidacao;

  const existe = await buscarPapelId(id);
  if (existe.status_code !== 200) return existe;

  papel.id = Number(id);
  const atualizado = await papelDAO.setUpdatePapeis(papel);

  if (atualizado) {
    MESSAGES.DEFAULT_HEADER.status = true;
    MESSAGES.DEFAULT_HEADER.status_code = 200;
    MESSAGES.DEFAULT_HEADER.message = 'Papel atualizado com sucesso!';
    MESSAGES.DEFAULT_HEADER.itens.papel = papel;
    return MESSAGES.DEFAULT_HEADER;
  } else {
    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
  }
};

const excluirPapel = async (id) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (!id || isNaN(id) || id <= 0) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID inválido]';
    return MESSAGES.ERROR_REQUIRED_FIELDS;
  }

  const existe = await buscarPapelId(id);
  if (existe.status_code !== 200) return existe;

  const deletado = await papelDAO.setDeletePapeis(Number(id));
  if (deletado) {
    MESSAGES.DEFAULT_HEADER.status = true;
    MESSAGES.DEFAULT_HEADER.status_code = 200;
    MESSAGES.DEFAULT_HEADER.message = 'Papel excluído com sucesso.';
    return MESSAGES.DEFAULT_HEADER;
  } else {
    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
  }
};

const validarDadosPapel = (papel) => {
  const camposInvalidos = [];

  if (!papel.nome_papel || papel.nome_papel.length > 100)
    camposInvalidos.push('nome_papel');

  if (camposInvalidos.length > 0) {
    const msg = `Campos obrigatórios ausentes ou inválidos: ${camposInvalidos.join(', ')}`;
    return { status: false, status_code: 400, message: msg };
  }

  return null;
};

module.exports = {
  listarPapeis,
  buscarPapelId,
  inserirPapel,
  atualizarPapel,
  excluirPapel
};
