import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env
dotenv.config();

// Criação do pool de conexões
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Teste de conexão
(async () => {
  try {
    const connection = await db.getConnection();

    console.log('Conexão com o banco de dados estabelecida com sucesso!');

    connection.release();

  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  }
})();

export default db;