//src/services/reservaService.js
import db from '../db/db.js';
import bcrypt from 'bcrypt';
 
export const findAll = async (cpf, formaPagamento, statusVaga, idReserva, idVaga, prazoCancelamento) => {
  let sql = 'SELECT * FROM reserva';
  const conditions = [];
  const values = [];
 
  if (formaPagamento) {
    conditions.push('formaPagamento = ?');
    values.push(formaPagamento);
  }
 
  if (idVaga) {
    conditions.push('idVaga = ?');
    values.push(idVaga);
  
  }
 
  if (idReserva) {
    conditions.push('idReserva = ?');
    values.push(idReserva);
  }
 
  if (prazoCancelamento) {
    conditions.push('prazoCancelamento = ?');
    values.push(prazoCancelamento);
  }

  if (statusVaga) {
    conditions.push('statusVaga = ?');
    values.push(statusVaga);
  }

  if (cpf) {
    conditions.push('cpf = ?');
    values.push(cpf);
  }
 
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
 
  const [rows] = await db.query(sql, values);
  return rows;

};
 
export const create = async (newReserva) => {
 
  await db.query('INSERT INTO reserva SET ?', newReserva);
 
  return newReserva;
};
 
export const update = async (idReserva, newReserva) => {
 
  const [result] = await db.query('UPDATE reserva SET ? WHERE idReserva = ?', [newReserva, idReserva]);
  return result.affectedRows > 0;
};
 
export const remove = async (idReserva) => {
  const [result] = await db.query('DELETE FROM reserva WHERE idReserva = ?', [idReserva]);
  return result.affectedRows > 0;
};