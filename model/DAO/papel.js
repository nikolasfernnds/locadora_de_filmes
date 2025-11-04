const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

const getSelectAllPapeis = async () => {
  try {
    const sql = `SELECT * FROM tbl_papel ORDER BY papel_id DESC`;
    const result = await prisma.$queryRawUnsafe(sql);
    return Array.isArray(result) ? result : false;
  } catch (error) {
    console.error('Erro getSelectAllPapeis:', error);
    return false;
  }
};

const getSelectByIdPapeis = async (id) => {
  try {
    const sql = `SELECT * FROM tbl_papel WHERE papel_id = ${id}`;
    const result = await prisma.$queryRawUnsafe(sql);
    return Array.isArray(result) ? result : false;
  } catch (error) {
    console.error('Erro getSelectByIdPapeis:', error);
    return false;
  }
};

const setInsertPapeis = async (papel) => {
  try {
    const sql = `INSERT INTO tbl_papel (nome_papel)
                 VALUES ('${papel.nome_papel}')`;
    const result = await prisma.$executeRawUnsafe(sql);
    return result ? true : false;
  } catch (error) {
    console.error('Erro setInsertPapeis:', error);
    return false;
  }
};

const setUpdatePapeis = async (papel) => {
  try {
    const sql = `UPDATE tbl_papel 
                 SET nome_papel = '${papel.nome_papel}'
                 WHERE papel_id = ${papel.id}`;
    const result = await prisma.$executeRawUnsafe(sql);
    return result ? true : false;
  } catch (error) {
    console.error('Erro setUpdatePapeis:', error);
    return false;
  }
};

const setDeletePapeis = async (id) => {
  try {
    const sql = `DELETE FROM tbl_papel WHERE papel_id = ${id}`;
    const result = await prisma.$executeRawUnsafe(sql);
    return result ? true : false;
  } catch (error) {
    console.error('Erro setDeletePapeis:', error);
    return false;
  }
};

module.exports = {
  getSelectAllPapeis,
  getSelectByIdPapeis,
  setInsertPapeis,
  setUpdatePapeis,
  setDeletePapeis
};
