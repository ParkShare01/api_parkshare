import db from '../db/db.js';

export const findAll = async (
  idVaga,
  statusVaga,
  endereco,
  cep,
  tipoVaga,
  dataHorario
) => {
  let sql = 'SELECT * FROM vaga';

  const conditions = [];
  const values = [];

  if (idVaga) {
    conditions.push('idVaga = ?');
    values.push(idVaga);
  }

  if (statusVaga) {
    conditions.push('LOWER(statusVaga) LIKE ?');
    values.push(`%${statusVaga.toLowerCase()}%`);
  }

  if (endereco) {
    conditions.push('LOWER(endereco) LIKE ?');
    values.push(`%${endereco.toLowerCase()}%`);
  }

  if (cep) {
    conditions.push('cep = ?');
    values.push(cep);
  }

  if (tipoVaga) {
    conditions.push('LOWER(tipoVaga) LIKE ?');
    values.push(`%${tipoVaga.toLowerCase()}%`);
  }

  if (dataHorario) {
    conditions.push('dataHorario = ?');
    values.push(dataHorario);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  const [rows] = await db.query(sql, values);

  return rows;
};

export const create = async (newVaga) => {
  await db.query('INSERT INTO vaga SET ?', newVaga);

  return newVaga;
};

export const update = async (idVaga, newVaga) => {
  const [result] = await db.query(
    'UPDATE vaga SET ? WHERE idVaga = ?',
    [newVaga, idVaga]
  );

  return result.affectedRows > 0;
};

export const remove = async (idVaga) => {
  const [result] = await db.query(
    'DELETE FROM vaga WHERE idVaga = ?',
    [idVaga]
  );

  return result.affectedRows > 0;
};