const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

const getSelectAllClassificacoes = async () => {
  try {
    const sql = `SELECT * FROM tbl_classificacao_indicativa ORDER BY classificacao_indicativa_id DESC`;
    const rsClassificacao = await prisma.$queryRawUnsafe(sql);
    return rsClassificacao;
  } catch (error) {
    return false;
  }
};

const getSelectByIdClassificacao = async (id) => {
  try {
    const sql = `SELECT * FROM tbl_classificacao_indicativa WHERE classificacao_indicativa_id = ${id}`;
    const rsClassificacao = await prisma.$queryRawUnsafe(sql);
    return rsClassificacao;
  } catch (error) {
    return false;
  }
};

const setInsertClassificacao = async (dadosClassificacao) => {
  try {
    const sql = `
      INSERT INTO tbl_classificacao_indicativa (nome)
      VALUES ('${dadosClassificacao.nome}')
    `;
    const result = await prisma.$executeRawUnsafe(sql);
    return result;
  } catch (error) {
    return false;
  }
};

const setUpdateClassificacao = async (dadosClassificacao) => {
  try {
    const sql = `
      UPDATE tbl_classificacao_indicativa
      SET nome = '${dadosClassificacao.nome}'
      WHERE classificacao_indicativa_id = ${dadosClassificacao.id}
    `;
    const result = await prisma.$executeRawUnsafe(sql);
    return result;
  } catch (error) {
    return false;
  }
};

const setDeleteClassificacao = async (id) => {
  try {
    const sql = `DELETE FROM tbl_classificacao_indicativa WHERE classificacao_indicativa_id = ${id}`;
    const result = await prisma.$executeRawUnsafe(sql);
    return result;
  } catch (error) {
    return false;
  }
};

module.exports = {
  getSelectAllClassificacoes,
  getSelectByIdClassificacao,
  setInsertClassificacao,
  setUpdateClassificacao,
  setDeleteClassificacao
};
