const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

const getSelectAllGeneros = async () => {
  try {
    const sql = `SELECT * FROM tbl_genero ORDER BY genero_id DESC`;
    const result = await prisma.$queryRawUnsafe(sql);
    return Array.isArray(result) ? result : false;
  } catch (error) {
    console.error('Erro getSelectAllGeneros:', error);
    return false;
  }
};

const getSelectByIdGeneros = async (id) => {
  try {
    const sql = `SELECT * FROM tbl_genero WHERE genero_id = ${id}`;
    const result = await prisma.$queryRawUnsafe(sql);
    return Array.isArray(result) ? result : false;
  } catch (error) {
    console.error('Erro getSelectByIdGeneros:', error);
    return false;
  }
};

const setInsertGeneros = async (genero) => {
  try {
    const sql = `INSERT INTO tbl_genero (categoria)
                 VALUES ('${genero.categoria}')`;
    const result = await prisma.$executeRawUnsafe(sql);
    return result ? true : false;
  } catch (error) {
    console.error('Erro setInsertGenero:', error);
    return false;
  }
};

const setUpdateGeneros = async (genero) => {
  try {
    const sql = `UPDATE tbl_genero 
                 SET categoria = '${genero.categoria}'
                 WHERE genero_id = ${genero.id}`;
    const result = await prisma.$executeRawUnsafe(sql);
    return result ? true : false;
  } catch (error) {
    console.error('Erro setUpdateGeneros:', error);
    return false;
  }
};

const setDeleteGeneros = async (id) => {
  try {
    const sql = `DELETE FROM tbl_genero WHERE genero_id = ${id}`;
    const result = await prisma.$executeRawUnsafe(sql);
    return result ? true : false;
  } catch (error) {
    console.error('Erro setDeleteGeneros:', error);
    return false;
  }
};

module.exports = {
  getSelectAllGeneros,
  getSelectByIdGeneros,
  setInsertGeneros,
  setUpdateGeneros,
  setDeleteGeneros
};
