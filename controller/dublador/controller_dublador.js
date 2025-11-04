const dubladorDAO = require('../../model/DAO/dublador.js');
const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

const listarDubladores = async () => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  try {
    const dubladores = await dubladorDAO.getSelectAllDubladores();

    if (dubladores && dubladores.length > 0) {
      MESSAGES.DEFAULT_HEADER.status = true;
      MESSAGES.DEFAULT_HEADER.status_code = 200;
      MESSAGES.DEFAULT_HEADER.itens.dublador = dubladores;
      return MESSAGES.DEFAULT_HEADER;
    } else {
      return MESSAGES.ERROR_NOT_FOUND;
    }
  } catch {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const buscarDubladorId = async (id) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (!id || isNaN(id) || id <= 0) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID inválido]';
    return MESSAGES.ERROR_REQUIRED_FIELDS;
  }

  try {
    const dublador = await dubladorDAO.getSelectByIdDublador(Number(id));

    if (dublador && dublador.length > 0) {
      MESSAGES.DEFAULT_HEADER.status = true;
      MESSAGES.DEFAULT_HEADER.status_code = 200;
      MESSAGES.DEFAULT_HEADER.itens.dublador = dublador;
      return MESSAGES.DEFAULT_HEADER;
    } else {
      return MESSAGES.ERROR_NOT_FOUND;
    }
  } catch {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const inserirDublador = async (dublador, contentType) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (String(contentType).toUpperCase() !== 'APPLICATION/JSON')
    return MESSAGES.ERROR_CONTENT_TYPE;

  const erroValidacao = validarDadosDublador(dublador);
  if (erroValidacao) return erroValidacao;

  const inserido = await dubladorDAO.setInsertDublador(dublador);
  if (inserido) {
    MESSAGES.DEFAULT_HEADER.status = true;
    MESSAGES.DEFAULT_HEADER.status_code = 201;
    MESSAGES.DEFAULT_HEADER.message = 'Dublador inserido com sucesso!';
    return MESSAGES.DEFAULT_HEADER;
  } else {
    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
  }
};

const atualizarDublador = async (dublador, id, contentType) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (String(contentType).toUpperCase() !== 'APPLICATION/JSON')
    return MESSAGES.ERROR_CONTENT_TYPE;

  const erroValidacao = validarDadosDublador(dublador);
  if (erroValidacao) return erroValidacao;

  const existe = await buscarDubladorId(id);
  if (existe.status_code !== 200) return existe;

  dublador.id = Number(id);
  const atualizado = await dubladorDAO.setUpdateDublador(dublador);

  if (atualizado) {
    MESSAGES.DEFAULT_HEADER.status = true;
    MESSAGES.DEFAULT_HEADER.status_code = 200;
    MESSAGES.DEFAULT_HEADER.message = 'Dublador atualizado com sucesso!';
    MESSAGES.DEFAULT_HEADER.itens.dublador = dublador;
    return MESSAGES.DEFAULT_HEADER;
  } else {
    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
  }
};

const excluirDublador = async (id) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (!id || isNaN(id) || id <= 0) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID inválido]';
    return MESSAGES.ERROR_REQUIRED_FIELDS;
  }

  const existe = await buscarDubladorId(id);
  if (existe.status_code !== 200) return existe;

  const deletado = await dubladorDAO.setDeleteDublador(Number(id));
  if (deletado) {
    MESSAGES.DEFAULT_HEADER.status = true;
    MESSAGES.DEFAULT_HEADER.status_code = 200;
    MESSAGES.DEFAULT_HEADER.message = 'Dublador excluído com sucesso.';
    return MESSAGES.DEFAULT_HEADER;
  } else {
    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
  }
};

const validarDadosDublador = (dublador) => {
  const camposInvalidos = [];

  if (!dublador.nome || dublador.nome.length > 150) camposInvalidos.push('nome');
  if (!dublador.idioma || dublador.idioma.length > 50) camposInvalidos.push('idioma');

  if (camposInvalidos.length > 0) {
    const msg = `Campos obrigatórios ausentes ou inválidos: ${camposInvalidos.join(', ')}`;
    return { status: false, status_code: 400, message: msg };
  }

  return null;
};

module.exports = {
  listarDubladores,
  buscarDubladorId,
  inserirDublador,
  atualizarDublador,
  excluirDublador
};
