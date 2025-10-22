/******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUDde dados no MySQL referente ao filme
 * Versão: 1.0
 * Data: 01/10/2025
 * Autor: Nikolas Fernandes Vieira
 * ****************************************************************************/

/*********************************************************************************************
 * Exemplos de dependências para conexão com Banco de Dados:
 * Bancos de Dados relacionais
 *      Sequelize -> Foi utilizado em muitos projetos desde o início do Node (Limitações técnicas)
 *      Prisma -> É uma dependência atual que trabalha com Banco de Dados (MySQL, PostgreSQL ou ORM...)
 *      Knet -> É uma dependência que trabalha com MySQL
 *
 * Bancos de Dados NÃO relacional:
 *      Mongoose -> É uma dependência para o Mongo DB (Não relacional)
 *
 *      npx prisma migrate dev -> Realiza o sincronismo entre o prisma e o BD (Cuidado), nesse processo você poderá perder dados reais do banco, pois ele pega as tabelas programadas no ORM schema.prisma
 *      npx prisma generate     -> Apenas realiza os sincronismo entre o prisma e o banco, geralmente usamos para rodar o projeto em um PC novo
 *********************************************************************************************/

const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

const getSelectAllMovies = async () => {
  try {
    const sql = `SELECT * FROM tbl_filme ORDER BY filme_id DESC`;
    const result = await prisma.$queryRawUnsafe(sql);
    return Array.isArray(result) ? result : false;
  } catch (error) {
    console.error('Erro getSelectAllMovies:', error);
    return false;
  }
};

const getSelectByIdMovies = async (id) => {
  try {
    const sql = `SELECT * FROM tbl_filme WHERE filme_id = ${id}`;
    const result = await prisma.$queryRawUnsafe(sql);
    return Array.isArray(result) ? result : false;
  } catch (error) {
    console.error('Erro getSelectByIdMovies:', error);
    return false;
  }
};

const setInsertMovies = async (filme) => {
  try {
    const sql = `INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
                 VALUES ('${filme.nome}', '${filme.sinopse}', '${filme.data_lancamento}', '${filme.duracao}', ${filme.orcamento}, '${filme.trailer}', '${filme.capa}')`;
    const result = await prisma.$executeRawUnsafe(sql);
    return result ? true : false;
  } catch (error) {
    console.error('Erro setInsertMovies:', error);
    return false;
  }
};

const setUpdateMovies = async (filme) => {
  try {
    const sql = `UPDATE tbl_filme SET 
                   nome='${filme.nome}', 
                   sinopse='${filme.sinopse}', 
                   data_lancamento='${filme.data_lancamento}', 
                   duracao='${filme.duracao}', 
                   orcamento=${filme.orcamento}, 
                   trailer='${filme.trailer}', 
                   capa='${filme.capa}' 
                 WHERE id=${filme.id}`;
    const result = await prisma.$executeRawUnsafe(sql);
    return result ? true : false;
  } catch (error) {
    console.error('Erro setUpdateMovies:', error);
    return false;
  }
};

const setDeleteMovies = async (id) => {
  try {
    const sql = `DELETE FROM tbl_filme WHERE filme_id = ${id}`;
    const result = await prisma.$executeRawUnsafe(sql);
    return result;
  } catch (error) {
    console.error('Erro setDeleteMovies:', error);
    return false;
  }
};

module.exports = {
  getSelectAllMovies,
  getSelectByIdMovies,
  setInsertMovies,
  setUpdateMovies,
  setDeleteMovies
};
