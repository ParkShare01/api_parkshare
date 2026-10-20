// src/services/clienteServices.js
import db from '../db/db.js';
import bcrypt from 'bcrypt';

export const findAll = async (cpf, nome, email) => {
  // 1. Define a consulta SQL base
  let sql = 'SELECT * FROM usuario';
  // 2. Cria um array para as condições WHERE
  const conditions = [];
  // 3. Cria um array para os valores (para prevenir SQL Injection)
  const values = [];
  // 4. Adiciona as condições dinamicamente
  // Adicionamos o filtro de CPF
  if (cpf) {
    conditions.push('cpf = ?');
    values.push(cpf);
  }
  // Adicionamos o filtro de nome
  if (nome) {
    conditions.push('LOWER(nome) LIKE ?');
    values.push(`%${nome.toLowerCase()}%`);
  }
  // Adicionamos o filtro de email
  if (email) {
    conditions.push('email = ?');
    values.push(email);
  }

  // 5. Se houver condições, anexa elas à consulta SQL
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
  // 6. Executa a consulta final
  const [rows] = await db.query(sql, values);
  return rows;

};


export const create = async (usuarioData) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(usuarioData.senha, saltRounds);

  const newUsuario = {
    ...usuarioData,
    senha: hashedPassword,
    tipo: 'usuario',
  };

  await db.query('INSERT INTO usuario SET ?', newUsuario);

  delete newUsuario.senha;
  return newUsuario;
};

export const update = async (cpf, usuarioData) => {
  if (usuarioData.senha) {
    const saltRounds = 10;
    usuarioData.senha = await bcrypt.hash(usuarioData.senha, saltRounds);
  }
  const [result] = await db.query('UPDATE usuario SET ? WHERE cpf = ?', [usuarioData, cpf]);
  return result.affectedRows > 0;
};

export const remove = async (cpf) => {
  const [result] = await db.query('DELETE FROM usuario WHERE cpf = ?', [cpf]);
  return result.affectedRows > 0;
};