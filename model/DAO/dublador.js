const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

const getSelectAllDubladores = async () => {
  try {
    const sql = `SELECT * FROM tbl_dublador ORDER BY dublador_id DESC`;
    const result = await prisma.$queryRawUnsafe(sql);
    return Array.isArray(result) ? result : false;
  } catch (error) {
    console.error('Erro getSelectAllDubladores:', error);
    return false;
  }
};

const getSelectByIdDublador = async (id) => {
  try {
    const sql = `SELECT * FROM tbl_dublador WHERE dublador_id = ${id}`;
    const result = await prisma.$queryRawUnsafe(sql);
    return Array.isArray(result) ? result : false;
  } catch (error) {
    console.error('Erro getSelectByIdDublador:', error);
    return false;
  }
};

const setInsertDublador = async (dublador) => {
  try {
    const sql = `INSERT INTO tbl_dublador (nome, idioma)
                 VALUES ('${dublador.nome}', '${dublador.idioma}')`;
    const result = await prisma.$executeRawUnsafe(sql);
    return result ? true : false;
  } catch (error) {
    console.error('Erro setInsertDublador:', error);
    return false;
  }
};

const setUpdateDublador = async (dublador) => {
  try {
    const sql = `UPDATE tbl_dublador 
                 SET nome = '${dublador.nome}', idioma = '${dublador.idioma}'
                 WHERE dublador_id = ${dublador.id}`;
    const result = await prisma.$executeRawUnsafe(sql);
    return result ? true : false;
  } catch (error) {
    console.error('Erro setUpdateDublador:', error);
    return false;
  }
};

const setDeleteDublador = async (id) => {
  try {
    const sql = `DELETE FROM tbl_dublador WHERE dublador_id = ${id}`;
    const result = await prisma.$executeRawUnsafe(sql);
    return result ? true : false;
  } catch (error) {
    console.error('Erro setDeleteDublador:', error);
    return false;
  }
};

module.exports = {
  getSelectAllDubladores,
  getSelectByIdDublador,
  setInsertDublador,
  setUpdateDublador,
  setDeleteDublador
};
