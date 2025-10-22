/******************************************************************************
 * Objetivo: Arquivo responsável pelas mensagens padronizadas da API
 * Autor: Nikolas Fernandes Vieira
 * Data: 07/10/2025
 * Versão: 1.0
 *****************************************************************************/

const data_atual = new Date();

const DEFAULT_HEADER = {
  development: 'Nikolas Fernandes Vieira',
  api_description: 'API para manipular dados de filmes',
  status: false,
  status_code: 0,
  request_date: data_atual.toLocaleString(),
  itens: {}
};

const SUCCESS_REQUEST = {
  status: true,
  status_code: 200,
  message: 'Requisição bem-sucedida!'
};

const SUCCESS_CREATED_ITEM = {
  status: true,
  status_code: 201,
  message: 'Item criado com sucesso!'
};

const SUCCESS_UPDATED_ITEM = {
  status: true,
  status_code: 200,
  message: 'Item atualizado com sucesso!'
};

const ERROR_NOT_FOUND = {
  status: false,
  status_code: 404,
  message: 'Não foram encontrados dados de retorno.'
};

const ERROR_INTERNAL_SERVER_CONTROLLER = {
  status: false,
  status_code: 500,
  message: 'Erro interno no servidor (Controller).'
};

const ERROR_INTERNAL_SERVER_MODEL = {
  status: false,
  status_code: 500,
  message: 'Erro interno no servidor (Model).'
};

const ERROR_REQUIRED_FIELDS = {
  status: false,
  status_code: 400,
  message: 'Campos obrigatórios ausentes ou incorretos.'
};

const ERROR_CONTENT_TYPE = {
  status: false,
  status_code: 415,
  message: 'Tipo de conteúdo inválido. Use application/json.'
};

module.exports = {
  DEFAULT_HEADER,
  SUCCESS_REQUEST,
  SUCCESS_CREATED_ITEM,
  SUCCESS_UPDATED_ITEM,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER_CONTROLLER,
  ERROR_INTERNAL_SERVER_MODEL,
  ERROR_REQUIRED_FIELDS,
  ERROR_CONTENT_TYPE
};