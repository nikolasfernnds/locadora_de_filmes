const classificacaoDAO = require('../../model/DAO/classificacao_indicativa.js');
const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

const listarClassificacoes = async () => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  try {
    const classificacoes = await classificacaoDAO.getSelectAllClassificacoes();

    if (classificacoes && classificacoes.length > 0) {
      MESSAGES.DEFAULT_HEADER.status = true;
      MESSAGES.DEFAULT_HEADER.status_code = 200;
      MESSAGES.DEFAULT_HEADER.itens.classificacao_indicativa = classificacoes;
      return MESSAGES.DEFAULT_HEADER;
    } else {
      return MESSAGES.ERROR_NOT_FOUND;
    }
  } catch {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const buscarClassificacaoId = async (id) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (!id || isNaN(id) || id <= 0) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID inválido]';
    return MESSAGES.ERROR_REQUIRED_FIELDS;
  }

  try {
    const classificacao = await classificacaoDAO.getSelectByIdClassificacao(Number(id));

    if (classificacao && classificacao.length > 0) {
      MESSAGES.DEFAULT_HEADER.status = true;
      MESSAGES.DEFAULT_HEADER.status_code = 200;
      MESSAGES.DEFAULT_HEADER.itens.classificacao_indicativa = classificacao;
      return MESSAGES.DEFAULT_HEADER;
    } else {
      return MESSAGES.ERROR_NOT_FOUND;
    }
  } catch {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const inserirClassificacao = async (dados, contentType) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (String(contentType).toUpperCase() !== 'APPLICATION/JSON')
    return MESSAGES.ERROR_CONTENT_TYPE;

  const erroValidacao = validarDadosClassificacao(dados);
  if (erroValidacao) return erroValidacao;

  const inserido = await classificacaoDAO.setInsertClassificacao(dados);
  if (inserido) {
    MESSAGES.DEFAULT_HEADER.status = true;
    MESSAGES.DEFAULT_HEADER.status_code = 201;
    MESSAGES.DEFAULT_HEADER.message = 'Classificação indicativa inserida com sucesso!';
    return MESSAGES.DEFAULT_HEADER;
  } else {
    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
  }
};

const atualizarClassificacao = async (dados, id, contentType) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (String(contentType).toUpperCase() !== 'APPLICATION/JSON')
    return MESSAGES.ERROR_CONTENT_TYPE;

  const erroValidacao = validarDadosClassificacao(dados);
  if (erroValidacao) return erroValidacao;

  const existe = await buscarClassificacaoId(id);
  if (existe.status_code !== 200) return existe;

  dados.id = Number(id);
  const atualizado = await classificacaoDAO.setUpdateClassificacao(dados);

  if (atualizado) {
    MESSAGES.DEFAULT_HEADER.status = true;
    MESSAGES.DEFAULT_HEADER.status_code = 200;
    MESSAGES.DEFAULT_HEADER.message = 'Classificação indicativa atualizada com sucesso!';
    MESSAGES.DEFAULT_HEADER.itens.classificacao_indicativa = dados;
    return MESSAGES.DEFAULT_HEADER;
  } else {
    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
  }
};

const excluirClassificacao = async (id) => {
  let MESSAGES = structuredClone(DEFAULT_MESSAGES);

  if (!id || isNaN(id) || id <= 0) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID inválido]';
    return MESSAGES.ERROR_REQUIRED_FIELDS;
  }

  const existe = await buscarClassificacaoId(id);
  if (existe.status_code !== 200) return existe;

  const deletado = await classificacaoDAO.setDeleteClassificacao(Number(id));
  if (deletado) {
    MESSAGES.DEFAULT_HEADER.status = true;
    MESSAGES.DEFAULT_HEADER.status_code = 200;
    MESSAGES.DEFAULT_HEADER.message = 'Classificação indicativa excluída com sucesso.';
    return MESSAGES.DEFAULT_HEADER;
  } else {
    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
  }
};

const validarDadosClassificacao = (dados) => {
  const camposInvalidos = [];

  if (!dados.nome || dados.nome.length > 5) camposInvalidos.push('nome');

  if (camposInvalidos.length > 0) {
    const msg = `Campos obrigatórios ausentes ou inválidos: ${camposInvalidos.join(', ')}`;
    return { status: false, status_code: 400, message: msg };
  }

  return null;
};

module.exports = {
  listarClassificacoes,
  buscarClassificacaoId,
  inserirClassificacao,
  atualizarClassificacao,
  excluirClassificacao
};
